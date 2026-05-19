import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { supabase } from "../../lib/supabaseClient";
import { Portfolio } from "../../hooks/usePortfolios";

function SortableItem({ portfolio }: { portfolio: Portfolio }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: portfolio.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <div style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        border: isDragging ? "2px solid #111" : "2px solid #eee",
        boxShadow: isDragging ? "0 8px 24px rgba(0,0,0,0.15)" : "none",
      }}>
        <img
          src={portfolio.thumbnail_url}
          alt={portfolio.title}
          style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", display: "block", pointerEvents: "none" }}
        />
        <div style={{ padding: "10px 12px" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {portfolio.title}
          </p>
        </div>
      </div>
    </div>
  );
}

export function SortView() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    async function fetch() {
      const { data } = await supabase
        .from("portfolios")
        .select("*")
        .order("order_index", { ascending: true });
      setPortfolios(data || []);
      setLoading(false);
    }
    fetch();
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setPortfolios((items) => {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    for (let i = 0; i < portfolios.length; i++) {
      await supabase
        .from("portfolios")
        .update({ order_index: i })
        .eq("id", portfolios[i].id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#888" }}>불러오는 중...</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", padding: "60px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111", margin: 0 }}>순서 변경</h1>
            <p style={{ color: "#888", fontSize: 14, marginTop: 6 }}>드래그해서 썸네일 순서를 바꾸세요</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ padding: "12px 24px", background: "#111", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
          >
            {saving ? "저장 중..." : saved ? "✅ 저장됨!" : "순서 저장하기"}
          </button>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={portfolios.map((p) => p.id)} strategy={rectSortingStrategy}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {portfolios.map((portfolio) => (
                <SortableItem key={portfolio.id} portfolio={portfolio} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}