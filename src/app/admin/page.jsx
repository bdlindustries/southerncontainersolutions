"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Lock, Plus, Edit2, Trash2, LogOut, 
  Upload, Save, Image as ImageIcon, RefreshCw, Video, Play, GripVertical, PackageOpen 
} from "lucide-react";
import { 
  collection, addDoc, getDocs, doc, setDoc, deleteDoc 
} from "firebase/firestore";
import { 
  signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "@/lib/firebase";
import { listingImageUrls } from "@/lib/data";
import { getYoutubeEmbedUrl, getYoutubeVideoId } from "@/lib/youtube";

function coerceImageList(raw) {
  if (raw == null) return [];
  if (Array.isArray(raw)) return raw.map(s => (s == null ? '' : String(s).trim())).filter(s => s.length > 0);
  if (typeof raw === 'string') return [raw.trim()];
  return [];
}

const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (!auth) throw new Error("Firebase Auth is not connected.");
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess?.();
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 animate-in fade-in duration-300 pb-12">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-slate-400 hover:text-amber-500 text-sm font-bold transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to website
      </Link>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-black text-white">Admin Access</h1>
          <p className="text-slate-500 text-sm mt-1">Southern Container Solutions</p>
        </div>

        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
            <div className="relative">
              <input required type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded p-4 text-white outline-none focus:border-amber-500 transition-colors pr-12" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors text-xs font-bold">
                {showPass ? 'HIDE' : 'SHOW'}
              </button>
            </div>
          </div>
          {error && <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm font-medium px-4 py-3 rounded">{error}</div>}
          <button disabled={loading || !auth} className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 py-4 rounded font-black transition-colors">
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminItemForm = ({ item, onSave, onCancel }) => {
  const isNew = !item?.id;
  const fileInputRef = useRef(null);

  const initialImages = () => {
    const fromImages = coerceImageList(item?.images);
    if (fromImages.length) return fromImages;
    return coerceImageList(item?.image);
  };

  const [form, setForm] = useState({
    title: item?.title || '',
    price: item?.price || '',
    description: item?.description || '',
    features: Array.isArray(item?.features) ? item.features.join('\n') : '',
    availability: item?.availability || 'In Stock - Ready to Ship',
    images: initialImages(),
    order: item?.order ?? 99,
    youtubeUrl: item?.youtubeUrl || item?.videoUrl || '',
  });

  const [uploadProgress, setUploadProgress] = useState(null);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState(null);

  const moveImage = (from, to) => {
    if (from === to || from < 0 || to < 0 || from >= form.images.length || to >= form.images.length) return;
    setForm((f) => {
      const images = [...f.images];
      const [moved] = images.splice(from, 1);
      images.splice(to, 0, moved);
      return { ...f, images };
    });
  };

  const moveImageByOffset = (index, offset) => moveImage(index, index + offset);

  const uploadToStorage = (file) => new Promise((resolve, reject) => {
    const safeName = file.name.replace(/[^\w.-]/g, '_');
    const storageRef = ref(storage, `scs_inventory/${Date.now()}_${safeName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
      (snapshot) => setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)),
      reject,
      async () => resolve(await getDownloadURL(uploadTask.snapshot.ref))
    );
  });

  const handlePhotosUpload = async (e) => {
    const files = [...(e.target.files || [])].filter((f) => f.type.startsWith('image/'));
    e.target.value = '';
    if (!files.length || !storage) return;
    for (const file of files) {
      try {
        const url = await uploadToStorage(file);
        setForm(f => ({ ...f, images: [...f.images, url] }));
      } catch (err) {
        console.error("Upload failed", err);
      }
    }
    setUploadProgress(null);
  };

  const removeImageAt = (index) => setForm(f => ({ ...f, images: f.images.filter((_, i) => i !== index) }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const priceNum = parseInt(form.price, 10) || 0;
    const imgs = form.images.filter(Boolean);
    const youtubeUrl = form.youtubeUrl.trim();
    const youtubeVideoId = getYoutubeVideoId(youtubeUrl);
    
    const itemData = {
      ...(item || {}),
      title: form.title.trim(),
      price: priceNum,
      priceStr: '$' + priceNum.toLocaleString(),
      description: form.description.trim(),
      features: form.features.split('\n').map(x => x.trim()).filter(Boolean),
      availability: form.availability.trim(),
      images: imgs,
      image: imgs[0] || '',
      order: parseInt(form.order, 10) || 0,
      youtubeUrl: youtubeVideoId ? youtubeUrl : '',
      youtubeVideoId: youtubeVideoId || '',
      updatedAt: Date.now(),
    };

    try {
      if (isNew) {
        const docRef = await addDoc(collection(db, 'scs_inventory'), itemData);
        await setDoc(docRef, { ...itemData, id: docRef.id }, { merge: true });
      } else {
        await setDoc(doc(db, 'scs_inventory', item.id), { ...itemData, id: item.id }, { merge: true });
      }
      onSave();
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full bg-slate-950 border border-slate-800 rounded p-3 text-white outline-none focus:border-amber-500 transition-colors text-sm";
  const labelCls = "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2";
  const youtubeEmbedPreview = getYoutubeEmbedUrl(form.youtubeUrl);

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelCls}>Title</label>
          <input required type="text" className={inputCls} value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} />
        </div>
        <div>
          <label className={labelCls}>Price (numbers only)</label>
          <input required type="number" className={inputCls} value={form.price} onChange={e => setForm(f => ({...f, price: e.target.value}))} />
        </div>
        <div>
          <label className={labelCls}>Display Order</label>
          <input type="number" className={inputCls} value={form.order} onChange={e => setForm(f => ({...f, order: e.target.value}))} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Availability Status</label>
          <input type="text" className={inputCls} value={form.availability} onChange={e => setForm(f => ({...f, availability: e.target.value}))} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Description</label>
          <textarea required rows="3" className={inputCls} value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Features (one per line)</label>
          <textarea rows="6" className={inputCls + " font-mono"} value={form.features} onChange={e => setForm(f => ({...f, features: e.target.value}))} />
        </div>

        <div className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-6">
          <div>
            <label className={labelCls}>Listing photos</label>
            <p className="text-xs text-slate-500 mt-1">Drag photos to reorder. The first photo is the shop catalog cover.</p>
          </div>
          {form.images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {form.images.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  draggable
                  onDragStart={() => setDragIndex(idx)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    if (dragIndex !== null && dragIndex !== idx) moveImage(dragIndex, idx);
                    setDragIndex(null);
                  }}
                  onDragEnd={() => setDragIndex(null)}
                  className={`relative group rounded-lg overflow-hidden border aspect-square bg-slate-900 cursor-grab active:cursor-grabbing transition-all ${
                    dragIndex === idx ? 'border-amber-500 opacity-60 scale-95' : 'border-slate-800'
                  } ${dragIndex !== null && dragIndex !== idx ? 'hover:border-amber-500/50' : ''}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover pointer-events-none" draggable={false} />
                  {idx === 0 && (
                    <span className="absolute top-2 left-2 text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                      Cover
                    </span>
                  )}
                  <div className="absolute top-2 right-2 bg-slate-950/80 rounded p-1 text-slate-400">
                    <GripVertical className="w-4 h-4" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-black/70 p-2 flex items-center justify-between gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveImageByOffset(idx, -1)}
                        className="text-[10px] font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white px-2 py-1 rounded"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        disabled={idx === form.images.length - 1}
                        onClick={() => moveImageByOffset(idx, 1)}
                        className="text-[10px] font-bold bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white px-2 py-1 rounded"
                      >
                        →
                      </button>
                    </div>
                    <button type="button" onClick={() => removeImageAt(idx)} className="text-[10px] font-bold bg-red-600 hover:bg-red-500 text-white px-2 py-1 rounded">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold px-4 py-3 rounded">
              <Upload className="w-4 h-4" /> {uploadProgress !== null ? `Uploading ${uploadProgress}%` : 'Add photos'}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotosUpload} />
          </div>
        </div>

        <div className="md:col-span-2 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
          <div>
            <label className={labelCls}>YouTube video (optional)</label>
            <p className="text-xs text-slate-500 mt-1">Paste a YouTube link to embed a walkthrough on the product page.</p>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Video className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                className={inputCls + " pl-10"}
                value={form.youtubeUrl}
                onChange={(e) => setForm((f) => ({ ...f, youtubeUrl: e.target.value }))}
              />
            </div>
            {form.youtubeUrl && (
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, youtubeUrl: '' }))}
                className="shrink-0 bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold px-4 py-3 rounded"
              >
                Clear
              </button>
            )}
          </div>
          {form.youtubeUrl && !youtubeEmbedPreview && (
            <p className="text-xs text-amber-500 font-medium">Could not parse that URL. Use a standard YouTube watch or youtu.be link.</p>
          )}
          {youtubeEmbedPreview && (
            <div className="aspect-video rounded-lg overflow-hidden border border-slate-800 bg-black">
              <iframe
                src={youtubeEmbedPreview}
                title="YouTube preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-black px-6 py-3 rounded transition-colors">
          <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button type="button" onClick={onCancel} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-6 py-3 rounded transition-colors">Cancel</button>
      </div>
    </form>
  );
};

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showNewForm, setShowNewForm] = useState(false);

  const fetchInventory = async () => {
    if (!db) return;
    const snapshot = await getDocs(collection(db, 'scs_inventory'));
    const items = snapshot.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    setInventory(items);
  };

  useEffect(() => {
    if (!auth) return setAuthChecked(true);
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user && !user.isAnonymous);
      setAuthChecked(true);
      if (user && !user.isAnonymous) fetchInventory();
    });
    return unsub;
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this listing permanently?')) return;
    await deleteDoc(doc(db, 'scs_inventory', id));
    fetchInventory();
  };

  if (!authChecked) return <div className="min-h-screen bg-slate-950"></div>;
  if (!isAdmin) return <AdminLogin onLoginSuccess={() => setIsAdmin(true)} />;

  return (
    <div className="min-h-screen bg-slate-950 text-white animate-in fade-in duration-300">
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center"><PackageOpen className="w-5 h-5 text-slate-950" /></div>
          <div><div className="font-black text-sm">Admin Dashboard</div><div className="text-slate-500 text-xs">Southern Container Solutions</div></div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 text-amber-500 hover:text-amber-400 text-xs font-bold border border-amber-500/40 rounded px-3 py-1.5">View website</Link>
          <button onClick={() => { signOut(auth); router.push('/'); }} className="flex items-center gap-1.5 bg-slate-800 hover:bg-red-900 px-3 py-1.5 rounded text-xs font-bold transition-colors"><LogOut className="w-3.5 h-3.5" /> Sign Out</button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {showNewForm ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4">Add New Listing</h2>
            <AdminItemForm item={null} onSave={() => { setShowNewForm(false); fetchInventory(); }} onCancel={() => setShowNewForm(false)} />
          </div>
        ) : editingItem ? (
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-8 mb-8">
            <h2 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-4">Editing: {editingItem.title}</h2>
            <AdminItemForm item={editingItem} onSave={() => { setEditingItem(null); fetchInventory(); }} onCancel={() => setEditingItem(null)} />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-8">
              <div><h1 className="text-2xl font-black">Inventory Listings</h1></div>
              <button onClick={() => setShowNewForm(true)} className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-2.5 rounded text-sm"><Plus className="w-4 h-4" /> Add Listing</button>
            </div>
            <div className="space-y-4">
              {inventory.map(item => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl flex overflow-hidden p-4">
                  <div className="w-32 h-24 bg-slate-800 rounded shrink-0 overflow-hidden">
                    {listingImageUrls(item)[0] && <img src={listingImageUrls(item)[0]} alt="" className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 ml-4 flex justify-between">
                    <div>
                      <h3 className="font-black text-lg">{item.title}</h3>
                      <div className="text-amber-500 font-black">{item.priceStr}</div>
                      <div className="text-xs text-slate-500 mt-1">{item.availability}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button onClick={() => setEditingItem(item)} className="bg-slate-800 hover:bg-amber-500 text-xs font-bold px-3 py-1.5 rounded transition-colors">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="bg-slate-800 hover:bg-red-700 text-xs font-bold px-3 py-1.5 rounded transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
