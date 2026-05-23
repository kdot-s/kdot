import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Shield } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/components/ProductCard";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

type FormState = {
  name: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
  purchase_url: string;
  features: string;
};

const empty: FormState = {
  name: "", description: "", price: "0", image_url: "",
  category: "Script", purchase_url: "", features: "",
};

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Product[];
    },
    enabled: isAdmin,
  });

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(empty);
  const [saving, setSaving] = useState(false);

  if (loading) return <div className="p-10 text-center text-muted-foreground">Loading...</div>;
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <Shield className="mx-auto mb-4 h-12 w-12 text-destructive" />
          <h1 className="text-2xl font-bold">Access denied</h1>
          <p className="mt-2 text-muted-foreground">This area is restricted to the admin account.</p>
          <Button asChild className="mt-6"><Link to="/">Back home</Link></Button>
        </div>
      </div>
    );
  }

  const openNew = () => { setEditingId(null); setForm(empty); setOpen(true); };
  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      price: String(p.price),
      image_url: p.image_url ?? "",
      category: p.category,
      purchase_url: p.purchase_url ?? "",
      features: p.features.join("\n"),
    });
    setOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        price: Number(form.price) || 0,
        image_url: form.image_url.trim() || null,
        category: form.category.trim() || "Script",
        purchase_url: form.purchase_url.trim() || null,
        features: form.features.split("\n").map(s => s.trim()).filter(Boolean),
      };
      if (editingId) {
        const { error } = await supabase.from("products").update(payload).eq("id", editingId);
        if (error) throw error;
        toast.success("Product updated");
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
        toast.success("Product added");
      }
      setOpen(false);
      qc.invalidateQueries({ queryKey: ["products"] });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const del = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary">Admin · F10</div>
            <h1 className="mt-1 text-3xl font-bold">Product control</h1>
            <p className="mt-1 text-sm text-muted-foreground">Add, edit, and remove scripts in the store.</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNew}><Plus className="mr-1 h-4 w-4" />New product</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingId ? "Edit product" : "Add product"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={save} className="space-y-3">
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Price (USD)</Label>
                    <Input type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Category</Label>
                    <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Image URL</Label>
                  <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
                </div>
                <div className="space-y-1.5">
                  <Label>Purchase URL (Discord, payment link, etc.)</Label>
                  <Input value={form.purchase_url} onChange={(e) => setForm({ ...form, purchase_url: e.target.value })} placeholder="https://discord.gg/..." />
                </div>
                <div className="space-y-1.5">
                  <Label>Features (one per line)</Label>
                  <Textarea rows={4} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder={"Zero recoil\nAll weapons supported"} />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={saving}>{saving ? "Saving..." : editingId ? "Save changes" : "Create"}</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-3">
          {products?.length === 0 && (
            <Card className="border-dashed bg-surface/50 p-8 text-center text-muted-foreground">
              No products yet. Add your first script.
            </Card>
          )}
          {products?.map((p) => (
            <Card key={p.id} className="flex items-center gap-4 border-border bg-surface p-4">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded bg-background">
                {p.image_url ? <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" /> : <div className="h-full w-full grid-bg" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-semibold">{p.name}</h3>
                  <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">{p.category}</span>
                </div>
                <p className="truncate text-sm text-muted-foreground">{p.description}</p>
              </div>
              <div className="font-mono text-lg font-bold text-gradient">${p.price.toFixed(2)}</div>
              <div className="flex gap-1">
                <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" onClick={() => del(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
