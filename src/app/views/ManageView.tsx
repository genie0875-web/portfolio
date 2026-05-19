import { useState, useRef } from "react";
import { supabase } from "../../lib/supabaseClient";
import { usePortfolios } from "../../hooks/usePortfolios";

type Portfolio = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  detail_images: string[];
  category: string;
  order_index: number;
};

const extractStoragePath = (url: string, bucket: string): string => {
  const marker = `/object/public/${bucket}/`;
  const idx = url.indexOf(marker);
  return idx !== -1 ? decodeURIComponent(url.slice(idx + marker.length)) : url;
};

const uploadFile = async (file: File, bucket: string): Promise<string> => {
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(bucket).upload(fileName, file);
  if (error) throw new Error(`업로드 실패: ${error.message}`);
  const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
  return data.publicUrl;
};

export default function ManageView() {
  const { portfolios, loading, refetch } = usePortfolios();

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const [editTarget, setEditTarget] = useState<Portfolio | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("");

  // 썸네일: null = 기존 유지, "" = 삭제(교체 필요), File = 새 파일
  const [newThumbnailFile, setNewThumbnailFile] = useState<File | null>(null);
  const [newThumbnailPreview, setNewThumbnailPreview] = useState<string | null>(null);
  const [thumbnailCleared, setThumbnailCleared] = useState(false); // 기존 썸네일 삭제 여부

  const [existingDetailImages, setExistingDetailImages] = useState<string[]>([]);
  const [newDetailFiles, setNewDetailFiles] = useState<File[]>([]);
  const [newDetailPreviews, setNewDetailPreviews] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const detailInputRef = useRef<HTMLInputElement>(null);

  const openEdit = (item: Portfolio) => {
    setEditTarget(item);
    setEditTitle(item.title);
    setEditDescription(item.description ?? "");
    setEditCategory(item.category ?? "");
    setNewThumbnailFile(null);
    setNewThumbnailPreview(null);
    setThumbnailCleared(false);
    setExistingDetailImages(item.detail_images ?? []);
    setNewDetailFiles([]);
    setNewDetailPreviews([]);
    setMessage(null);
  };

  const closeEdit = () => setEditTarget(null);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewThumbnailFile(file);
    setNewThumbnailPreview(URL.createObjectURL(file));
    setThumbnailCleared(false);
  };

  // 썸네일 삭제 (새로 선택한 것 취소 or 기존 것 제거)
  const clearThumbnail = () => {
    if (newThumbnailFile) {
      // 새로 고른 파일만 취소 → 기존 썸네일로 복구
      setNewThumbnailFile(null);
      setNewThumbnailPreview(null);
    } else {
      // 기존 썸네일 삭제 표시
      setThumbnailCleared(true);
    }
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
  };

  const handleDetailFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setNewDetailFiles((prev) => [...prev, ...files]);
    setNewDetailPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const handleSave = async () => {
    if (!editTarget) return;

    // 썸네일이 없는 상태로 저장 시도 시 경고
    if (thumbnailCleared && !newThumbnailFile) {
      setMessage({ type: "error", text: "썸네일 이미지를 새로 선택해주세요." });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      let thumbnailUrl = editTarget.thumbnail_url;

      if (newThumbnailFile) {
        // 기존 썸네일 삭제 + 새 파일 업로드
        const oldPath = extractStoragePath(editTarget.thumbnail_url, "thumbnails");
        thumbnailUrl = await uploadFile(newThumbnailFile, "thumbnails");
        await supabase.storage.from("thumbnails").remove([oldPath]);
      }

      // 삭제된 기존 상세 이미지 처리
      const removedDetails = (editTarget.detail_images ?? []).filter(
        (url) => !existingDetailImages.includes(url)
      );
      if (removedDetails.length > 0) {
        const paths = removedDetails.map((url) => extractStoragePath(url, "detail-images"));
        await supabase.storage.from("detail-images").remove(paths);
      }

      // 새 상세 이미지 업로드
      const uploadedUrls = await Promise.all(
        newDetailFiles.map((file) => uploadFile(file, "detail-images"))
      );

      const finalDetailImages = [...existingDetailImages, ...uploadedUrls];

      const { error } = await supabase
        .from("portfolios")
        .update({
          title: editTitle,
          description: editDescription,
          category: editCategory,
          thumbnail_url: thumbnailUrl,
          detail_images: finalDetailImages,
        })
        .eq("id", editTarget.id);

      if (error) throw new Error(`저장 실패: ${error.message}`);

      setMessage({ type: "success", text: "수정이 완료됐어요!" });
      refetch();
      setTimeout(() => closeEdit(), 900);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      setMessage({ type: "error", text: msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, thumbnailUrl: string, detailImages: string[]) => {
    setDeletingId(id);
    setMessage(null);
    try {
      await supabase.storage
        .from("thumbnails")
        .remove([extractStoragePath(thumbnailUrl, "thumbnails")]);

      if (detailImages?.length > 0) {
        await supabase.storage
          .from("detail-images")
          .remove(detailImages.map((u) => extractStoragePath(u, "detail-images")));
      }

      const { error } = await supabase.from("portfolios").delete().eq("id", id);
      if (error) throw new Error(error.message);

      setMessage({ type: "success", text: "삭제됐어요." });
      refetch();
    } catch (err: unknown) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "오류 발생" });
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  if (loading)
    return (
      <div style={s.center}>
        <p style={{ color: "#9ca3af" }}>불러오는 중...</p>
      </div>
    );

  // 썸네일 미리보기 결정
  const thumbPreview = thumbnailCleared
    ? null
    : newThumbnailPreview ?? editTarget?.thumbnail_url ?? null;

  return (
    <div style={s.container}>
      <h1 style={s.title}>포트폴리오 관리</h1>

      {message && !editTarget && (
        <div style={{ ...s.msg, ...(message.type === "success" ? s.msgOk : s.msgErr) }}>
          {message.text}
        </div>
      )}

      <div style={s.list}>
        {portfolios.map((item) => (
          <div key={item.id} style={s.card}>
            <img src={item.thumbnail_url} alt={item.title} style={s.thumb} />
            <div style={s.info}>
              <p style={s.itemTitle}>{item.title}</p>
              <p style={s.itemMeta}>
                {item.category} · 상세 {item.detail_images?.length ?? 0}장
              </p>
            </div>
            <div style={s.actions}>
              <button style={s.editBtn} onClick={() => openEdit(item as Portfolio)}>
                수정
              </button>
              {confirmId !== item.id ? (
                <button style={s.deleteBtn} onClick={() => setConfirmId(item.id)}>
                  삭제
                </button>
              ) : (
                <div style={s.confirmRow}>
                  <span style={{ fontSize: 13, color: "#374151" }}>정말요?</span>
                  <button
                    style={s.confirmYes}
                    disabled={deletingId === item.id}
                    onClick={() =>
                      handleDelete(item.id, item.thumbnail_url, item.detail_images ?? [])
                    }
                  >
                    {deletingId === item.id ? "..." : "삭제"}
                  </button>
                  <button style={s.confirmNo} onClick={() => setConfirmId(null)}>
                    취소
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ─── 수정 모달 ─── */}
      {editTarget && (
        <div style={s.overlay} onClick={closeEdit}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <h2 style={s.modalTitle}>수정</h2>
              <button style={s.closeBtn} onClick={closeEdit}>✕</button>
            </div>

            {message && (
              <div
                style={{
                  ...s.msg,
                  ...(message.type === "success" ? s.msgOk : s.msgErr),
                  marginBottom: 16,
                }}
              >
                {message.text}
              </div>
            )}

            <label style={s.label}>제목</label>
            <input
              style={s.input}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <label style={s.label}>설명</label>
            <textarea
              style={{ ...s.input, height: 80, resize: "vertical" }}
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />

            <label style={s.label}>카테고리</label>
            <input
              style={s.input}
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            />

            {/* 썸네일 */}
            <label style={s.label}>썸네일</label>
            <div style={s.imageRow}>
              {thumbPreview ? (
                <div style={s.detailItem}>
                  <img src={thumbPreview} alt="thumb" style={s.previewImg} />
                  <button style={s.removeImg} onClick={clearThumbnail}>✕</button>
                  {newThumbnailFile && <span style={s.newBadge}>NEW</span>}
                </div>
              ) : (
                <div style={s.emptyThumb}>없음</div>
              )}
              <div>
                <button style={s.uploadBtn} onClick={() => thumbnailInputRef.current?.click()}>
                  {thumbnailCleared ? "이미지 선택" : "이미지 교체"}
                </button>
                {thumbnailCleared && (
                  <p style={{ ...s.fileNote, color: "#ef4444" }}>⚠ 새 이미지를 선택해주세요</p>
                )}
                {newThumbnailFile && (
                  <p style={s.fileNote}>✓ {newThumbnailFile.name}</p>
                )}
              </div>
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleThumbnailChange}
              />
            </div>

            {/* 상세 이미지 */}
            <label style={s.label}>상세 이미지</label>
            <div style={s.detailGrid}>
              {existingDetailImages.map((url) => (
                <div key={url} style={s.detailItem}>
                  <img src={url} alt="" style={s.detailImg} />
                  <button
                    style={s.removeImg}
                    onClick={() =>
                      setExistingDetailImages((prev) => prev.filter((u) => u !== url))
                    }
                  >
                    ✕
                  </button>
                </div>
              ))}
              {newDetailPreviews.map((url, i) => (
                <div key={`new-${i}`} style={s.detailItem}>
                  <img src={url} alt="" style={{ ...s.detailImg, opacity: 0.75 }} />
                  <span style={s.newBadge}>NEW</span>
                  <button
                    style={s.removeImg}
                    onClick={() => {
                      setNewDetailFiles((prev) => prev.filter((_, j) => j !== i));
                      setNewDetailPreviews((prev) => prev.filter((_, j) => j !== i));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button style={s.addDetailBtn} onClick={() => detailInputRef.current?.click()}>
                + 추가
              </button>
              <input
                ref={detailInputRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleDetailFilesChange}
              />
            </div>

            <div style={s.modalFooter}>
              <button style={s.cancelBtn} onClick={closeEdit}>취소</button>
              <button style={s.saveBtn} disabled={saving} onClick={handleSave}>
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const s: Record<string, React.CSSProperties> = {
  container: { maxWidth: 860, margin: "0 auto", padding: "48px 24px", fontFamily: "sans-serif" },
  title: { fontSize: 28, fontWeight: 700, marginBottom: 32, color: "#111" },
  center: { display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" },
  msg: { padding: "12px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500, marginBottom: 24 },
  msgOk: { background: "#d1fae5", color: "#065f46" },
  msgErr: { background: "#fee2e2", color: "#991b1b" },
  list: { display: "flex", flexDirection: "column", gap: 12 },
  card: { display: "flex", alignItems: "center", gap: 16, padding: 16, border: "1px solid #e5e7eb", borderRadius: 12, background: "#fff" },
  thumb: { width: 72, height: 72, objectFit: "cover", borderRadius: 8, flexShrink: 0, background: "#f3f4f6" },
  info: { flex: 1, minWidth: 0 },
  itemTitle: { fontSize: 15, fontWeight: 600, color: "#111", margin: 0, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  itemMeta: { fontSize: 13, color: "#6b7280", margin: 0 },
  actions: { display: "flex", gap: 8, alignItems: "center", flexShrink: 0 },
  editBtn: { padding: "8px 16px", background: "#fff", border: "1px solid #6b7280", color: "#374151", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500 },
  deleteBtn: { padding: "8px 16px", background: "#fff", border: "1px solid #ef4444", color: "#ef4444", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500 },
  confirmRow: { display: "flex", alignItems: "center", gap: 8 },
  confirmYes: { padding: "8px 14px", background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 600 },
  confirmNo: { padding: "8px 14px", background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13 },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  modalTitle: { fontSize: 20, fontWeight: 700, margin: 0, color: "#111" },
  closeBtn: { background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#6b7280" },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, marginTop: 20 },
  // ✅ 텍스트 블랙으로
  input: { width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 14, boxSizing: "border-box", outline: "none", color: "#111", background: "#fff" },
  imageRow: { display: "flex", alignItems: "center", gap: 16, marginTop: 8 },
  previewImg: { width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb" },
  emptyThumb: { width: 80, height: 80, border: "2px dashed #d1d5db", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#9ca3af", flexShrink: 0 },
  uploadBtn: { padding: "8px 16px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: 8, cursor: "pointer", fontSize: 14, color: "#374151" },
  fileNote: { fontSize: 12, color: "#059669", marginTop: 6, margin: "6px 0 0 0" },
  detailGrid: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 8 },
  detailItem: { position: "relative", width: 80, height: 80 },
  detailImg: { width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb" },
  removeImg: { position: "absolute", top: -6, right: -6, width: 20, height: 20, background: "#ef4444", color: "#fff", border: "none", borderRadius: "50%", cursor: "pointer", fontSize: 11, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" },
  newBadge: { position: "absolute", bottom: 4, left: 4, background: "#3b82f6", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 4px", borderRadius: 4 },
  addDetailBtn: { width: 80, height: 80, border: "2px dashed #d1d5db", borderRadius: 8, background: "#f9fafb", cursor: "pointer", fontSize: 13, color: "#6b7280" },
  modalFooter: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 32 },
  cancelBtn: { padding: "10px 20px", background: "#f3f4f6", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, color: "#374151" },
  saveBtn: { padding: "10px 24px", background: "#111", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 600 },
};
