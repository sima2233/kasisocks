import AdminProductCRUD from '../components/AdminProductCRUD';

const AdminPage = () => {
    return (
        <div className="min-h-screen bg-white p-8">
            <h1 className="font-serif text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
            <div className="max-w-4xl mx-auto">
                <AdminProductCRUD />
            </div>
        </div>
    );
};

export default AdminPage;
