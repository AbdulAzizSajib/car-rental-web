"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/ui/alert-dialog";
import { FuelType } from "@/src/types/car.types";
import { getFuelTypesAction } from "@/src/services/cars/fuelTypes/getFuelTypes.action";
import { updateFuelTypeAction } from "@/src/services/cars/fuelTypes/updateFuelType.action";
import { createFuelTypeAction } from "@/src/services/cars/fuelTypes/createFuelType.action";
import { deleteFuelTypeAction } from "@/src/services/cars/fuelTypes/deleteFuelType.action";

const PAGE_SIZE = 10;

interface FormState {
  name: string;
  image: string;
}

const emptyForm: FormState = { name: "", image: "" };

export default function AdminFuelTypesPage() {
  const [fuelTypes, setFuelTypes] = useState<FuelType[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<FuelType | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<FuelType | null>(null);
  const [deleting, setDeleting] = useState(false);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const fetchFuelTypes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getFuelTypesAction({
        page,
        limit: PAGE_SIZE,
        search: debouncedSearch || undefined,
      });
      setFuelTypes(res.data ?? []);
      setTotal(res.meta?.total ?? res.data?.length ?? 0);
    } catch {
      setFuelTypes([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchFuelTypes();
  }, [fetchFuelTypes]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setFormError(null);
    setDialogOpen(true);
  };

  const openEdit = (fuelType: FuelType) => {
    setEditing(fuelType);
    setForm({ name: fuelType.name, image: fuelType.image ?? "" });
    setFormError(null);
    setDialogOpen(true);
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setFormError("Name is required");
      return;
    }
    setSubmitting(true);
    setFormError(null);
    try {
      const payload = {
        name: form.name.trim(),
        ...(form.image.trim() ? { image: form.image.trim() } : {}),
      };
      if (editing) {
        await updateFuelTypeAction(editing.id, payload);
      } else {
        await createFuelTypeAction(payload);
      }
      setDialogOpen(false);
      await fetchFuelTypes();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteFuelTypeAction(deleteTarget.id);
      setDeleteTarget(null);
      if (fuelTypes.length === 1 && page > 1) {
        setPage((p) => p - 1);
      } else {
        await fetchFuelTypes();
      }
    } catch {
      // swallow; could surface toast
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen p-8" style={{ background: "#faf8f4" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[11px] uppercase tracking-[.18em] font-semibold text-gray-500">
              Cars / Fuel Types
            </span>
            <h1 className="font-['Bebas_Neue'] text-3xl tracking-wide text-gray-900 mt-1">
              Manage Fuel Types
            </h1>
          </div>
          <Button
            onClick={openCreate}
            className="bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Plus size={16} /> New Fuel Type
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-[#ede8df] overflow-hidden">
          {/* Toolbar */}
          <div className="px-5 py-4 border-b border-[#ede8df] flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search fuel types…"
                className="pl-9"
              />
            </div>
            <span className="text-xs text-gray-500 ml-auto">{total} total</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-gray-500 border-b border-[#ede8df]">
                  <th className="px-5 py-3 font-semibold">Fuel Type</th>
                  <th className="px-5 py-3 font-semibold">Image</th>
                  <th className="px-5 py-3 font-semibold text-right">Cars</th>
                  <th className="px-5 py-3 font-semibold text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-gray-400"
                    >
                      <Loader2
                        size={18}
                        className="animate-spin inline-block"
                      />
                    </td>
                  </tr>
                ) : fuelTypes.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-12 text-center text-gray-400"
                    >
                      No fuel types found.
                    </td>
                  </tr>
                ) : (
                  fuelTypes.map((ft) => (
                    <tr
                      key={ft.id}
                      className="border-b border-[#ede8df] last:border-0 hover:bg-[#faf8f4]"
                    >
                      <td className="px-5 py-3 font-medium text-gray-900">
                        {ft.name}
                      </td>
                      <td className="px-5 py-3">
                        {ft.image ? (
                          <Image
                            src={ft.image}
                            alt={ft.name}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-md object-cover bg-gray-50"
                            unoptimized
                          />
                        ) : (
                          <span className="text-xs text-gray-300">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right text-gray-600">
                        {ft._count?.cars ?? 0}
                      </td>

                      <td className="px-5 py-3 text-right">
                        <div className="inline-flex gap-1">
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => openEdit(ft)}
                            title="Edit"
                          >
                            <Pencil size={14} />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => setDeleteTarget(ft)}
                            title="Delete"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-5 py-3 border-t border-[#ede8df] flex items-center justify-between text-xs text-gray-500">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                size="sm"
                variant="outline"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Create / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Fuel Type" : "New Fuel Type "}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitForm} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">Name</label>
              <Input
                autoFocus
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder="e.g. Toyota"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700">
                Image URL
              </label>
              <Input
                value={form.image}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image: e.target.value }))
                }
                placeholder="https://…"
              />
            </div>
            {formError && (
              <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {formError}
              </p>
            )}
            <DialogFooter className="mt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-gray-900 hover:bg-gray-800 text-white"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Saving…
                  </>
                ) : editing ? (
                  "Save changes"
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete fuel type?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete{" "}
              <span className="font-semibold text-gray-900">
                {deleteTarget?.name}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting ? "Deleting…" : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
