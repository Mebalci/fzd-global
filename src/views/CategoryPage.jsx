'use client';



export default function CategoryPage({ slug }) {
return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900">
          Kategori: {slug}
        </h1>
        <p className="mt-4 text-gray-600">
          Bu sayfa daha sonra kategoriye göre ürün/portfolyo filtrelemek için kullanılacak.
        </p>
      </div>
    </div>
  );
}
