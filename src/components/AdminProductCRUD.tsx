import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Product } from '../types';

const initialProduct: Omit<Product, 'id'> = {
    name: '',
    description: '',
    price: 0,
    images: [],
    sizes: [],
};

const AdminProductCRUD: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [form, setForm] = useState<Omit<Product, 'id'>>(initialProduct);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    // Handle image upload to Supabase Storage
    const handleImageUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        setUploading(true);
        setError(null);
        const uploadedUrls: string[] = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filePath = `products/${Date.now()}_${file.name}`;
            const { error } = await supabase.storage.from('product-images').upload(filePath, file);
            if (error) {
                setError(error.message);
            } else {
                // Get a signed URL valid for 1 year
                const { data: signedData, error: signedError } = await supabase
                    .storage
                    .from('product-images')
                    .createSignedUrl(filePath, 31536000);
                if (signedError) {
                    setError(signedError.message);
                } else {
                    const signedUrl = signedData.signedUrl;
                    uploadedUrls.push(signedUrl);
                }
            }
        }
        setForm(prev => ({ ...prev, images: [...prev.images, ...uploadedUrls] }));
        setUploading(false);
    };

    // Drag and drop handlers
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageUpload(e.dataTransfer.files);
        }
    };
    // Fetch products from Supabase
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('products').select('*');
            if (error) setError(error.message);
            else setProducts(data || []);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }));
    };

    // Handle sizes and images
    const handleSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({ ...prev, sizes: e.target.value.split(',').map(s => s.trim()) }));
    };
    // Removed unused handleImagesChange

    // Add or update product
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (editingId) {
                // Update
                const { error } = await supabase.from('products').update(form).eq('id', editingId);
                if (error) throw error;
            } else {
                // Insert
                const { error } = await supabase.from('products').insert([form]);
                if (error) throw error;
            }
            // Refresh
            const { data } = await supabase.from('products').select('*');
            setProducts(data || []);
            setForm(initialProduct);
            setEditingId(null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Edit product
    const handleEdit = (product: Product) => {
        // Remove 'id' property before setting form state
        const { id, ...productWithoutId } = product;
        setForm(productWithoutId);
        setEditingId(product.id);
    };

    // Delete product
    const handleDelete = async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            setProducts(products.filter(p => p.id !== id));
            if (editingId === id) {
                setForm(initialProduct);
                setEditingId(null);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md">
            <h2 className="font-serif text-2xl font-bold mb-4">Manage Products</h2>
            {error && <div className="mb-4 text-red-500">{error}</div>}
            <form onSubmit={handleSubmit} className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded" required />
                <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded" required />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded" required />
                <input name="sizes" value={form.sizes.join(', ')} onChange={handleSizesChange} placeholder="Sizes (comma separated)" className="border p-2 rounded" />
                {/* Drag and drop area and file picker for images */}
                <div
                    className={`border-2 border-dashed rounded p-4 col-span-2 text-center mb-2 ${dragActive ? 'border-yellow-500 bg-yellow-50' : 'border-gray-300'}`}
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                >
                    <p>Drag & drop images here, or click to select files</p>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        style={{ display: 'none' }}
                        id="image-upload-input"
                        onChange={e => handleImageUpload(e.target.files)}
                    />
                    <label htmlFor="image-upload-input" className="cursor-pointer bg-yellow-500 text-black px-4 py-2 rounded mt-2 inline-block">
                        Choose Images
                    </label>
                    {uploading && <p className="text-yellow-500 mt-2">Uploading...</p>}
                    {form.images.length > 0 && (
                        <div className="flex flex-wrap gap-2 justify-center mt-2">
                            {form.images.map((img, idx) => (
                                <img key={idx} src={img} alt={`Product ${idx}`} className="h-16 w-16 object-cover rounded border" />
                            ))}
                        </div>
                    )}
                </div>
                <button type="submit" className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded mt-2" disabled={loading}>
                    {editingId ? 'Update Product' : 'Add Product'}
                </button>
                {editingId && <button type="button" className="bg-gray-200 text-black font-semibold py-2 px-4 rounded mt-2" onClick={() => { setForm(initialProduct); setEditingId(null); }}>
                    Cancel
                </button>}
            </form>
            <div>
                <h3 className="font-serif text-xl font-bold mb-2">Product List</h3>
                {loading ? <p>Loading...</p> : <ul className="divide-y divide-gray-200">
                    {products.map(product => (
                        <li key={product.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                                <span className="font-bold">{product.name}</span> - N${product.price.toFixed(2)}<br />
                                <span className="text-gray-600 text-sm">{product.description}</span><br />
                                <span className="text-gray-500 text-xs">Sizes: {product.sizes.join(', ')}</span><br />
                                {/* Show product images */}
                                <span className="text-gray-500 text-xs">Images:</span>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {product.images && product.images.map((img, idx) => (
                                        <img key={idx} src={img} alt={`Product ${idx}`} className="h-8 w-8 object-cover rounded border" />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-2 md:mt-0 flex gap-2">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(product)}>Edit</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(product.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>}
            </div>
        </div>
    );
};

export default AdminProductCRUD;
