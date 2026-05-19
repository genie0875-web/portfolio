import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export function AdminView() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [detailFiles, setDetailFiles] = useState<File[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [detailPreviews, setDetailPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleThumbnail(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  }

  function handleDetailFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setDetailFiles(files);
    setDetailPreviews(files.map((f) => URL.createObjectURL(f)));
  }

  async function uploadFile(bucket: string, file: File): Promise<string> {
    const ext = file.name.split(".").pop();
    const filename = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
    const { data, error } = await supabase.storage.from(bucket).upload(filename, file);
    if (error) throw new Error(error.message);
    const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path);
    return urlData.publicUrl;
  }

  async function handleSubmit() {
    setError("");
    setSuccess("");
    if (!title.trim()) return setError("제목을 입력해주세요.");
    if (!thumbnailFile) return setError("썸네일을 선택해주세요.");
    setUploading(true);
    try {
      setProgress("썸네일 업로드 중...");
      const thumbnailUrl = await uploadFile("thumbnails", thumbnailFile);
      const detailUrls: string[] = [];
      for (let i = 0; i < detailFiles.length; i++) {
        setProgress(`상세 이미지 업로드 중... (${i + 1}/${detailFiles.length})`);
        const url = await uploadFile("detail-images", detailFiles[i]);
        detailUrls.push(url);
      }
      setProgress("저장 중...");
      const { error: insertError } = await supabase.from("portfolios").insert({
        title: title.trim(),
        description: description.trim(),
        thumbnail_url: thumbnailUrl,
        detail_images: detailUrls,
      });
      if (insertError) throw new Error(insertError.message);
      setSuccess(`✅ "${title}" 등록 완료!`);
      setTitle("");
      setDescription("");
      setThumbnailFile(null);
      setThumbnailPreview(null);
      setDetailFiles([]);
      setDetailPreviews([]);
    } catch (err: any) {
      setError(`❌ ${err.message}`);
    } finally {
      setUploading(false);
      setProgress("");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "60px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", background: "#fff", borderRadius: 16, padding: "48px 40px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8, color: "#111" }}>포트폴리오 등록</h1>
        <p style={{ color: "#666", marginBottom: 40, fontSize: 14 }}>새 프로젝트를 갤러리에 추가합니다</p>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>프로젝트 제목 *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="예: DB생명 앱 리디자인" style={inputStyle} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>설명</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="프로젝트 설명" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>썸네일 이미지 * (갤러리에 표시되는 대표 이미지)</label>
          <label style={uploadZone}>
            {thumbnailPreview
              ? <img src={thumbnailPreview} style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 8, objectFit: "contain" }} />
              : <span style={{ color: "#999", fontSize: 14 }}>🖼 클릭하여 이미지 선택</span>}
            <input type="file" accept="image/*" onChange={handleThumbnail} style={{ display: "none" }} />
          </label>
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={labelStyle}>상세 이미지 (여러 장 선택 가능)</label>
          <label style={{ ...uploadZone, minHeight: 70 }}>
            <span style={{ color: "#999", fontSize: 14 }}>📁 클릭하여 이미지 여러 장 선택</span>
            <input type="file" accept="image/*" multiple onChange={handleDetailFiles} style={{ display: "none" }} />
          </label>
          {detailPreviews.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", gap: 8, marginTop: 12 }}>
              {detailPreviews.map((src, i) => (
                <img key={i} src={src} style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: 6 }} />
              ))}
            </div>
          )}
        </div>

        {error && <div style={{ background: "#fff5f5", border: "1px solid #fc8181", borderRadius: 8, padding: "12px 16px", color: "#c53030", marginBottom: 16, fontSize: 14 }}>{error}</div>}
        {success && <div style={{ background: "#f0fff4", border: "1px solid #68d391", borderRadius: 8, padding: "12px 16px", color: "#276749", marginBottom: 16, fontSize: 14 }}>{success}</div>}
        {uploading && <div style={{ background: "#ebf8ff", border: "1px solid #90cdf4", borderRadius: 8, padding: "12px 16px", color: "#2b6cb0", marginBottom: 16, fontSize: 14 }}>⏳ {progress}</div>}

        <button onClick={handleSubmit} disabled={uploading} style={{ width: "100%", padding: "14px", background: "#111", color: "#fff", border: "none", borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
          {uploading ? "업로드 중..." : "갤러리에 등록하기"}
        </button>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = { display: "block", fontSize: 14, fontWeight: 600, marginBottom: 6, color: "#333" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 12px", border: "1px solid #ddd", borderRadius: 8, fontSize: 14, boxSizing: "border-box", background: "#fff", color: "#111" };
const uploadZone: React.CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center", border: "2px dashed #ddd", borderRadius: 10, padding: 16, cursor: "pointer", minHeight: 120, background: "#fafafa" };