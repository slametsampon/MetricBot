Berikut ringkasan langkah-langkah untuk menambahkan fitur pencarian blog pada situs MetricBot menggunakan Fuse.js, dengan struktur folder yang kamu sebutkan:

- [1. **Setup Data Blog dengan next-contentlayer**](#1-setup-data-blog-dengan-next-contentlayer)
  - [a. **Instalasi next-contentlayer**](#a-instalasi-next-contentlayer)
  - [b. **Konfigurasi contentlayer**](#b-konfigurasi-contentlayer)
  - [c. **Update next.config.js**](#c-update-nextconfigjs)
  - [d. **Struktur File Markdown**](#d-struktur-file-markdown)
  - [e. **Membuat Data Blog Tersedia di Aplikasi Next.js**](#e-membuat-data-blog-tersedia-di-aplikasi-nextjs)
    - [Contoh Penggunaan di Halaman List Blog:](#contoh-penggunaan-di-halaman-list-blog)
    - [Contoh Penggunaan di Halaman Blog Detail:](#contoh-penggunaan-di-halaman-blog-detail)
- [2. **Integrasi Fuse.js untuk Pencarian**](#2-integrasi-fusejs-untuk-pencarian)
  - [1. **Instalasi Fuse.js**](#1-instalasi-fusejs)
  - [2. **Konfigurasi Data untuk Pencarian**](#2-konfigurasi-data-untuk-pencarian)
    - [Contoh file `/lib/searchBlog.ts`:](#contoh-file-libsearchblogts)
  - [3. **Membuat Komponen Pencarian di MetricBot**](#3-membuat-komponen-pencarian-di-metricbot)
    - [Contoh file `/components/metricBot/SearchBlog.tsx`:](#contoh-file-componentsmetricbotsearchblogtsx)
  - [4. **Menggunakan Komponen di Menu MetricBot**](#4-menggunakan-komponen-di-menu-metricbot)
    - [Contoh integrasi di halaman `app/metricBot/page.tsx`:](#contoh-integrasi-di-halaman-appmetricbotpagetsx)
  - [5. **Mengatur Sensitivitas dan Hasil Pencarian**](#5-mengatur-sensitivitas-dan-hasil-pencarian)
  - [6. **Testing**](#6-testing)
  - [7. **Optimasi Tambahan**](#7-optimasi-tambahan)
  - [8. **Menambahkan fitur pembobotan dalam pencarian**](#8-menambahkan-fitur-pembobotan-dalam-pencarian)
    - [1. **Menambahkan Pembobotan pada Fuse.js**](#1-menambahkan-pembobotan-pada-fusejs)
      - [Modifikasi file `searchBlog.ts` dengan bobot:](#modifikasi-file-searchblogts-dengan-bobot)
    - [2. **Penjelasan Tentang Pembobotan**](#2-penjelasan-tentang-pembobotan)
    - [3. **Pengaruh Pembobotan**](#3-pengaruh-pembobotan)
    - [4. **Eksperimen dengan Pembobotan**](#4-eksperimen-dengan-pembobotan)
    - [5. **Testing**](#5-testing)
- [3. **Buat Komponen Pencarian di MetricBot**](#3-buat-komponen-pencarian-di-metricbot)
  - [1. **Menyiapkan Data Pencarian**](#1-menyiapkan-data-pencarian)
    - [1.1. **Mengambil Data dari `contentlayer/generated`**](#11-mengambil-data-dari-contentlayergenerated)
    - [1.2. **Menyediakan Data untuk Pencarian**](#12-menyediakan-data-untuk-pencarian)
  - [2. **Mengkonfigurasi Fuse.js untuk Pencarian**](#2-mengkonfigurasi-fusejs-untuk-pencarian)
    - [2.1. **Menyiapkan Konfigurasi Fuse.js**](#21-menyiapkan-konfigurasi-fusejs)
    - [2.2. **Membuat Fungsi Pencarian**](#22-membuat-fungsi-pencarian)
  - [3. **Membuat Komponen Pencarian**](#3-membuat-komponen-pencarian)
  - [4. **Mengintegrasikan Komponen Pencarian**](#4-mengintegrasikan-komponen-pencarian)
  - [Kesimpulan](#kesimpulan)
- [4. **Utilitas Umum dan Helper**](#4-utilitas-umum-dan-helper)
  - [1. **Menyiapkan Folder dan Struktur**](#1-menyiapkan-folder-dan-struktur)
    - [1.1. **Folder Struktur**](#11-folder-struktur)
  - [2. **Menyimpan Fungsi Utilitas Umum di `/utils`**](#2-menyimpan-fungsi-utilitas-umum-di-utils)
    - [2.1. **Fungsi Normalisasi Teks**](#21-fungsi-normalisasi-teks)
    - [2.2. **Fungsi Formatting Teks**](#22-fungsi-formatting-teks)
  - [3. **Menggunakan Fungsi Helper di `/lib`**](#3-menggunakan-fungsi-helper-di-lib)
    - [3.1. **Menyiapkan Fungsi Helper**](#31-menyiapkan-fungsi-helper)
    - [3.2. **Menambahkan Pembantu untuk Formatting**](#32-menambahkan-pembantu-untuk-formatting)
  - [4. **Mengintegrasikan Utilitas dalam Komponen**](#4-mengintegrasikan-utilitas-dalam-komponen)
  - [Kesimpulan](#kesimpulan-1)
  - [5. **Style dengan Tailwind CSS**](#5-style-dengan-tailwind-css)
  - [1. **Menyiapkan Tailwind CSS**](#1-menyiapkan-tailwind-css)
  - [2. **Menerapkan Styling pada Input Pencarian**](#2-menerapkan-styling-pada-input-pencarian)
  - [3. **Menambahkan Styling pada Hasil Pencarian**](#3-menambahkan-styling-pada-hasil-pencarian)
  - [4. **Menerapkan Tampilan Responsif**](#4-menerapkan-tampilan-responsif)
- [Kesimpulan](#kesimpulan-2)
  - [6. **Integrasi ke dalam Menu MetricBot**](#6-integrasi-ke-dalam-menu-metricbot)
  - [1. **Menyiapkan Komponen Navigasi**](#1-menyiapkan-komponen-navigasi)
    - [1.1. **Membuat Komponen Navigasi (Jika Belum Ada)**](#11-membuat-komponen-navigasi-jika-belum-ada)
  - [2. **Menambahkan Halaman untuk MetricBot**](#2-menambahkan-halaman-untuk-metricbot)
    - [2.1. **Membuat Halaman MetricBot**](#21-membuat-halaman-metricbot)
  - [3. **Memperbarui Navigasi dengan Menu MetricBot**](#3-memperbarui-navigasi-dengan-menu-metricbot)
    - [3.1. **Menambahkan Link ke Menu MetricBot**](#31-menambahkan-link-ke-menu-metricbot)
  - [4. **Mengintegrasikan Navigasi ke Halaman Utama**](#4-mengintegrasikan-navigasi-ke-halaman-utama)
    - [4.1. **Menggunakan Navigasi di Halaman Utama**](#41-menggunakan-navigasi-di-halaman-utama)
  - [5. **Mengujinya**](#5-mengujinya)
  - [Kesimpulan](#kesimpulan-3)

### 1. **Setup Data Blog dengan next-contentlayer**
Langkah pertama dalam mengintegrasikan fitur pencarian blog di MetricBot adalah **Setup Data Blog dengan next-contentlayer**. Berikut penjelasan lengkap dan detail mengenai cara mengaturnya:


**next-contentlayer** adalah library yang memungkinkan kita untuk memproses konten file markdown dan mengubahnya menjadi data yang dapat digunakan langsung dalam Next.js. Markdown ini biasanya digunakan untuk menyimpan konten artikel, seperti blog yang kamu simpan di folder `/app/blog`.

#### a. **Instalasi next-contentlayer**
Jika belum terpasang, pertama kita perlu menginstal **next-contentlayer** dan juga **contentlayer**. Kedua library ini bekerja sama untuk mengelola konten markdown di Next.js.

```bash
pnpm install next-contentlayer contentlayer
```

#### b. **Konfigurasi contentlayer**
Selanjutnya, kita perlu mengkonfigurasi **contentlayer** agar dapat memproses file markdown dari folder `/app/blog`. Kamu bisa melakukannya dengan membuat file `contentlayer.config.ts` di root project.

Isi dari `contentlayer.config.ts`:

```ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files';

// Definisikan tipe dokumen untuk blog
export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `**/*.md`, // Mengambil semua file .md
  contentType: 'markdown',
  fields: {
    title: { type: 'string', required: true },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    summary: { type: 'string', required: true },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath}`, // Membuat URL dinamis untuk blog
    },
  },
}));

// Membuat source dari blog markdown
export default makeSource({
  contentDirPath: 'app/blog',  // Lokasi folder markdown
  documentTypes: [Blog],       // Menggunakan definisi dokumen Blog
});
```

#### c. **Update next.config.js**
Untuk mengaktifkan **next-contentlayer**, kamu perlu mengupdate file `next.config.js` agar mendukung pengolahan contentlayer.

```ts
// next.config.js
const { withContentlayer } = require('next-contentlayer');

module.exports = withContentlayer({
  reactStrictMode: true,
});
```

#### d. **Struktur File Markdown**
File markdown yang disimpan dalam folder `/app/blog` harus memiliki struktur metadata yang konsisten. Berikut contoh file markdown untuk blog yang sesuai dengan definisi `Blog` di `contentlayer.config.ts`:

```markdown
---
title: "Pentingnya Maintenance di Industri Petrokimia"
authors: ["John Doe"]
tags: ["maintenance", "petrokimia", "safety"]
summary: "Artikel ini membahas pentingnya maintenance untuk menjaga keamanan operasional."
---

**Pendahuluan**

Maintenance yang teratur sangat penting untuk operasional yang aman dan efisien di industri petrokimia...
```

#### e. **Membuat Data Blog Tersedia di Aplikasi Next.js**
Untuk menampilkan data blog yang sudah diolah oleh **contentlayer**, kita perlu memanfaatkan hook yang disediakan oleh contentlayer, yaitu `useMDXComponent`. Misalnya, kita bisa membuat halaman yang menampilkan semua blog atau halaman blog detail.

##### Contoh Penggunaan di Halaman List Blog:
Buat file `app/blog/page.tsx` untuk menampilkan semua blog dalam bentuk daftar.

```ts
import { allBlogs } from 'contentlayer/generated';  // Mengimpor semua blog yang telah diproses
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Daftar Artikel Blog</h1>
      <ul className="mt-4">
        {allBlogs.map((blog) => (
          <li key={blog._id} className="mb-4">
            <Link href={blog.url}>
              <a className="text-blue-600 hover:underline">{blog.title}</a>
            </Link>
            <p>{blog.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

##### Contoh Penggunaan di Halaman Blog Detail:
Buat file `[slug].tsx` di dalam folder `/app/blog` untuk menangani tampilan blog individual.

```ts
import { allBlogs } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function BlogDetail({ params }) {
  const blog = allBlogs.find((post) => post._raw.flattenedPath === params.slug);
  const MDXContent = useMDXComponent(blog.body.code);

  return (
    <div>
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">Ditulis oleh: {blog.authors.join(', ')}</p>
      <MDXContent />
    </div>
  );
}
```

### 2. **Integrasi Fuse.js untuk Pencarian**

#### 1. **Instalasi Fuse.js**
Langkah pertama adalah menginstal **Fuse.js**. Fuse.js adalah library JavaScript yang memudahkan pencarian berbasis teks dengan algoritma fuzzy search. Ini akan membantu pengguna mencari blog dengan query yang tidak harus 100% akurat.

Instal Fuse.js menggunakan **pnpm**:
```bash
pnpm install fuse.js
```

#### 2. **Konfigurasi Data untuk Pencarian**
Agar Fuse.js bisa mencari data blog, kita harus mempersiapkan data yang akan digunakan dalam proses pencarian. Karena kita sudah menggunakan **next-contentlayer**, kita bisa memanfaatkan data yang dihasilkan dari file markdown.

Buat file baru di folder `/lib` untuk mengelola fungsi pencarian. Misalnya, file tersebut bisa diberi nama `searchBlog.ts`.

##### Contoh file `/lib/searchBlog.ts`:

```ts
import Fuse from 'fuse.js';
import { allBlogs } from 'contentlayer/generated';  // Mengambil semua blog yang sudah dihasilkan oleh contentlayer

// Konfigurasi Fuse.js
const options = {
  keys: ['title', 'tags', 'summary'],  // Fields yang akan dicari
  threshold: 0.3,  // Sensitivitas pencarian, semakin rendah semakin akurat
};

const fuse = new Fuse(allBlogs, options);  // Membuat instance Fuse.js dengan data blog

// Fungsi untuk mencari blog berdasarkan query
export const searchBlog = (query: string) => {
  if (!query) return allBlogs;  // Jika query kosong, kembalikan semua blog
  const result = fuse.search(query);
  return result.map(({ item }) => item);  // Mengembalikan hasil pencarian
};
```

#### 3. **Membuat Komponen Pencarian di MetricBot**
Setelah data dan fungsi pencarian sudah siap, kita bisa membuat komponen pencarian untuk diintegrasikan ke dalam **MetricBot**. Komponen ini akan memuat input untuk query dan menampilkan hasil pencarian.

Buat komponen bernama `SearchBlog` di folder `/components/metricBot`. Komponen ini akan menggunakan fungsi `searchBlog` yang telah dibuat sebelumnya.

##### Contoh file `/components/metricBot/SearchBlog.tsx`:

```tsx
import { useState } from 'react';
import { searchBlog } from '../../lib/searchBlog';  // Import fungsi pencarian

const SearchBlog = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Handle perubahan query pencarian
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setQuery(query);
    const searchResults = searchBlog(query);  // Panggil fungsi pencarian
    setResults(searchResults);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Cari artikel blog..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 border border-gray-300 rounded"
      />
      
      {/* Menampilkan hasil pencarian */}
      <ul className="mt-4">
        {results.length > 0 ? (
          results.map((blog) => (
            <li key={blog._id} className="mb-2">
              <a href={blog.url} className="text-blue-600 hover:underline">{blog.title}</a>
              <p>{blog.summary}</p>
            </li>
          ))
        ) : (
          <li className="text-gray-600">Tidak ada hasil yang cocok</li>
        )}
      </ul>
    </div>
  );
};

export default SearchBlog;
```

#### 4. **Menggunakan Komponen di Menu MetricBot**
Setelah komponen `SearchBlog` siap, kamu bisa memasukkannya ke dalam menu **MetricBot** agar pengguna dapat melakukan pencarian blog dari antarmuka aplikasi.

Misalnya, kamu bisa menambahkannya di halaman atau modal yang berfungsi sebagai tempat interaksi **MetricBot**. Jika kamu memiliki halaman atau route khusus untuk **MetricBot**, tambahkan komponen pencarian di sana.

##### Contoh integrasi di halaman `app/metricBot/page.tsx`:

```tsx
import SearchBlog from '../../components/metricBot/SearchBlog';

export default function MetricBotPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pencarian Blog di MetricBot</h1>
      <SearchBlog />  {/* Menampilkan komponen pencarian */}
    </div>
  );
}
```

#### 5. **Mengatur Sensitivitas dan Hasil Pencarian**
**Fuse.js** menyediakan berbagai opsi untuk mengatur bagaimana pencarian dilakukan. Kamu bisa menyesuaikan opsi seperti `threshold` (sensitivitas pencarian), `keys` (field yang akan dicari), dan lainnya.

Misalnya, dalam konfigurasi di atas, kita menggunakan:
```ts
const options = {
  keys: ['title', 'tags', 'summary'],  // Field yang dicari
  threshold: 0.3,  // Sensitivitas pencarian, semakin rendah semakin akurat
};
```

Jika pencarian terlalu ketat, kamu bisa meningkatkan nilai `threshold` menjadi lebih tinggi (misalnya `0.5`) agar hasil yang sedikit berbeda juga ditampilkan. Sebaliknya, jika hasil pencarian terlalu longgar, kamu bisa menurunkan nilai `threshold` menjadi lebih kecil (misalnya `0.2`).

#### 6. **Testing**
- Buka halaman di mana kamu menempatkan **SearchBlog** dan coba input berbagai kata kunci untuk memastikan bahwa pencarian berjalan dengan baik.
- Cek apakah hasil pencarian sesuai dengan input dan tampilkan data yang benar.

#### 7. **Optimasi Tambahan**
- **Highlight Matching Terms**: Fuse.js memiliki fitur untuk menyoroti teks yang cocok dengan query. Kamu bisa memanfaatkan ini untuk menambahkan sorotan pada hasil pencarian.
- **Pagination**: Jika jumlah blog sangat banyak, kamu bisa mempertimbangkan untuk menambahkan fitur pagination atau infinite scroll untuk memuat hasil pencarian dalam batch.

#### 8. **Menambahkan fitur pembobotan dalam pencarian**

Penggunaan fitur **pembobotan (weighting)** pada **Fuse.js** memungkinkan kita untuk memberi prioritas lebih pada field tertentu saat melakukan pencarian. Misalnya, kamu mungkin ingin mencocokkan kata kunci pada judul blog lebih berat daripada pada summary atau tags, sehingga hasil yang ditemukan di judul muncul lebih tinggi dalam daftar hasil pencarian.

Berikut adalah penjelasan lengkap tentang bagaimana cara menambahkan **pembobotan** pada Fuse.js di pencarian MetricBot.

##### 1. **Menambahkan Pembobotan pada Fuse.js**
Untuk menerapkan pembobotan pada pencarian, kita bisa mengatur properti `weight` pada masing-masing **key** yang ingin dicari. Berikut adalah contoh bagaimana kita bisa menambahkan bobot lebih besar pada pencarian di `title`, dibandingkan dengan pencarian di `tags` dan `summary`.

###### Modifikasi file `searchBlog.ts` dengan bobot:
```ts
import Fuse from 'fuse.js';
import { allBlogs } from 'contentlayer/generated';

// Konfigurasi Fuse.js dengan bobot
const options = {
  keys: [
    { name: 'title', weight: 0.7 },   // Bobot lebih besar untuk title
    { name: 'tags', weight: 0.2 },    // Bobot sedang untuk tags
    { name: 'summary', weight: 0.1 }, // Bobot lebih kecil untuk summary
  ],
  threshold: 0.3,  // Sensitivitas pencarian
};

const fuse = new Fuse(allBlogs, options);  // Membuat instance Fuse.js dengan data blog

// Fungsi untuk mencari blog berdasarkan query
export const searchBlog = (query: string) => {
  if (!query) return allBlogs;  // Jika query kosong, kembalikan semua blog
  const result = fuse.search(query);
  return result.map(({ item }) => item);  // Mengembalikan hasil pencarian
};
```

##### 2. **Penjelasan Tentang Pembobotan**
- **`name`**: Nama field yang ingin dicari. Dalam contoh di atas, kita mencari pada `title`, `tags`, dan `summary`.
- **`weight`**: Bobot yang diberikan untuk field tersebut. Semakin besar bobot, semakin penting field tersebut saat pencarian. Dalam contoh di atas:
  - **title** diberi bobot **0.7**, artinya hasil pencarian yang cocok dengan judul akan lebih diprioritaskan.
  - **tags** memiliki bobot **0.2**, yang berarti cocok di tag akan kurang penting dibandingkan dengan cocok di judul.
  - **summary** diberi bobot **0.1**, artinya cocok di summary memiliki prioritas terendah.

##### 3. **Pengaruh Pembobotan**
Dengan pengaturan di atas, jika ada dua hasil pencarian:
- Blog A cocok di `title` dan `summary`.
- Blog B cocok di `tags`.

Maka, Blog A akan muncul lebih tinggi di daftar hasil pencarian karena cocok di `title` (yang memiliki bobot lebih besar) meskipun Blog B cocok di `tags`.

##### 4. **Eksperimen dengan Pembobotan**
Pembobotan adalah fitur yang sangat fleksibel dan bergantung pada kebutuhan aplikasi. Kamu bisa bereksperimen dengan mengubah nilai bobot sesuai dengan preferensi. Misalnya, jika kamu merasa pencarian di `summary` lebih penting, kamu bisa meningkatkan bobot untuk `summary`:

```ts
keys: [
  { name: 'title', weight: 0.5 },
  { name: 'tags', weight: 0.2 },
  { name: 'summary', weight: 0.3 },
]
```

##### 5. **Testing**
Coba beberapa skenario pencarian dengan query yang cocok di berbagai field (misalnya judul, tags, atau summary), lalu lihat bagaimana hasil pencarian berperilaku setelah pembobotan diterapkan.

Kamu juga bisa menambahkan console log untuk melihat bobot hasil pencarian dan mengevaluasi apakah hasilnya sudah sesuai dengan yang diharapkan.

```ts
export const searchBlog = (query: string) => {
  if (!query) return allBlogs;
  const result = fuse.search(query);
  console.log(result);  // Untuk debugging, lihat bobot dan hasil pencarian
  return result.map(({ item }) => item);
};
```

### 3. **Buat Komponen Pencarian di MetricBot**
Tentu! Mari kita lanjutkan dengan **Langkah 3** dalam proses integrasi pencarian blog dengan Fuse.js pada situs MetricBot Anda.


#### 1. **Menyiapkan Data Pencarian**

Sebelum kita bisa menggunakan Fuse.js untuk pencarian, kita perlu menyiapkan data yang akan digunakan oleh Fuse.js. Data ini biasanya diambil dari **`contentlayer/generated`** dan diubah menjadi format yang sesuai untuk pencarian.

##### 1.1. **Mengambil Data dari `contentlayer/generated`**
Misalkan kita ingin mengambil data blog dari **`contentlayer/generated`**. Kamu bisa menyiapkan data ini di file utilitas yang akan digunakan untuk pencarian.

```ts
// lib/searchUtils.ts
import { allBlogs } from 'contentlayer/generated';

export function getBlogData() {
  return allBlogs.map(blog => ({
    id: blog._id,
    title: blog.title,
    summary: blog.summary,
    content: blog.content,
  }));
}
```

Di sini, kita memetakan data blog menjadi objek yang hanya berisi field yang diperlukan untuk pencarian, seperti `title`, `summary`, dan `content`.

##### 1.2. **Menyediakan Data untuk Pencarian**

Simpan data yang sudah disiapkan ini dalam state atau context yang bisa diakses oleh komponen pencarian.

```ts
// components/MetricBot/SearchProvider.tsx
import React, { createContext, useContext, useState } from 'react';
import { getBlogData } from '../../lib/searchUtils';

const SearchContext = createContext<any>(null);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchData, setSearchData] = useState(getBlogData());

  return (
    <SearchContext.Provider value={{ searchData }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
```

#### 2. **Mengkonfigurasi Fuse.js untuk Pencarian**

##### 2.1. **Menyiapkan Konfigurasi Fuse.js**

Sekarang kita perlu mengkonfigurasi Fuse.js dengan pengaturan pencarian yang sesuai. Kamu bisa membuat file konfigurasi untuk Fuse.js.

```ts
// lib/fuseConfig.ts
import Fuse from 'fuse.js';

const options: Fuse.IFuseOptions<any> = {
  includeScore: true,
  keys: ['title', 'summary', 'content'],
  threshold: 0.3,  // Sensitivitas pencarian; semakin kecil nilai, semakin ketat pencarian
};

export const createFuseInstance = (data: any[]) => new Fuse(data, options);
```

##### 2.2. **Membuat Fungsi Pencarian**

Buat fungsi untuk melakukan pencarian dengan menggunakan instance Fuse.js yang telah dikonfigurasi.

```ts
// lib/searchUtils.ts
import { createFuseInstance } from './fuseConfig';

export function searchBlogs(query: string) {
  const data = getBlogData();
  const fuse = createFuseInstance(data);
  return fuse.search(query);
}
```

#### 3. **Membuat Komponen Pencarian**

Sekarang kita akan membuat komponen pencarian yang akan menggunakan fungsi pencarian ini untuk menampilkan hasilnya.

```ts
// components/MetricBot/SearchBar.tsx
import React, { useState } from 'react';
import { searchBlogs } from '../../lib/searchUtils';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery) {
      const result = searchBlogs(searchQuery);
      setResults(result.map(r => r.item));  // Menampilkan hanya item hasil pencarian
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Cari blog..."
        className="search-input"
      />
      <ul className="search-results">
        {results.map(result => (
          <li key={result.id} className="search-result-item">
            <h3>{result.title}</h3>
            <p>{result.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
```

#### 4. **Mengintegrasikan Komponen Pencarian**

Terakhir, integrasikan komponen pencarian ke dalam aplikasi Anda. Pastikan untuk membungkus komponen yang membutuhkan pencarian dengan `SearchProvider`.

```ts
// pages/_app.tsx
import { SearchProvider } from '../components/MetricBot/SearchProvider';

function MyApp({ Component, pageProps }: any) {
  return (
    <SearchProvider>
      <Component {...pageProps} />
    </SearchProvider>
  );
}

export default MyApp;
```

```ts
// pages/index.tsx
import SearchBar from '../components/MetricBot/SearchBar';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <SearchBar />
    {/* Konten lainnya */}
  </div>
);

export default HomePage;
```

#### Kesimpulan
Langkah-langkah di atas menjelaskan bagaimana mengimplementasikan fitur pencarian di situs MetricBot dengan menggunakan Fuse.js. Kita telah membahas:
- Menyiapkan data untuk pencarian.
- Mengkonfigurasi Fuse.js.
- Membuat komponen pencarian yang terintegrasi dengan Fuse.js.

Jika ada bagian tertentu yang memerlukan penjelasan lebih lanjut atau jika ada pertanyaan lain, silakan beritahu saya!

### 4. **Utilitas Umum dan Helper**

Pada langkah ini, kita akan menyimpan fungsi utilitas umum seperti formatting dan normalisasi teks pada folder **`/utils`**, dan menggunakan fungsi helper di folder **`/lib`** untuk mendukung pengolahan data markdown dan pencarian. Ini membantu menjaga kode tetap terstruktur dengan baik dan memudahkan pemeliharaan.

#### 1. **Menyiapkan Folder dan Struktur**

##### 1.1. **Folder Struktur**

Pastikan struktur folder Anda mencakup folder **`/utils`** untuk utilitas umum dan folder **`/lib`** untuk fungsi helper.

```
/components
  /metricBot
    - SearchBar.tsx
    - SearchProvider.tsx
  ...
/lib
  - searchUtils.ts
  - fuseConfig.ts
/utils
  - textUtils.ts
  ...
/pages
  - _app.tsx
  - index.tsx
...
```

#### 2. **Menyimpan Fungsi Utilitas Umum di `/utils`**

Fungsi utilitas umum seperti formatting dan normalisasi teks sebaiknya disimpan di folder **`/utils`**. Berikut adalah beberapa contoh fungsi yang mungkin berguna:

##### 2.1. **Fungsi Normalisasi Teks**

Fungsi ini berguna untuk membersihkan dan menormalkan teks sebelum diproses oleh pencarian.

```ts
// utils/textUtils.ts
export function normalizeText(text: string): string {
  return text
    .toLowerCase() // Ubah ke huruf kecil
    .replace(/[\W_]+/g, ' '); // Hapus karakter non-alfanumerik dan underscore
}
```

##### 2.2. **Fungsi Formatting Teks**

Fungsi ini membantu dalam memformat teks untuk ditampilkan, misalnya, mempersingkat teks.

```ts
// utils/textUtils.ts
export function truncateText(text: string, length: number): string {
  return text.length > length ? `${text.substring(0, length)}...` : text;
}
```

#### 3. **Menggunakan Fungsi Helper di `/lib`**

Fungsi helper di folder **`/lib`** akan memanfaatkan fungsi utilitas dari **`/utils`** untuk mendukung pengolahan data markdown dan pencarian.

##### 3.1. **Menyiapkan Fungsi Helper**

Misalnya, fungsi helper untuk memproses dan menormalkan data blog sebelum pencarian.

```ts
// lib/searchUtils.ts
import { normalizeText } from '../utils/textUtils';

export function getBlogData() {
  return allBlogs.map(blog => ({
    id: blog._id,
    title: normalizeText(blog.title),
    summary: normalizeText(blog.summary),
    content: normalizeText(blog.content),
  }));
}
```

Di sini, kita menggunakan `normalizeText` untuk memastikan teks yang dimasukkan ke dalam Fuse.js konsisten dan dapat dicari dengan lebih efektif.

##### 3.2. **Menambahkan Pembantu untuk Formatting**

Jika diperlukan, tambahkan fungsi lain di **`/lib`** yang menggunakan utilitas umum.

```ts
// lib/displayUtils.ts
import { truncateText } from '../utils/textUtils';

export function getFormattedBlogSummary(summary: string): string {
  return truncateText(summary, 100); // Truncate to 100 characters
}
```

#### 4. **Mengintegrasikan Utilitas dalam Komponen**

Gunakan fungsi utilitas dan helper yang sudah dibuat dalam komponen untuk memformat dan menampilkan data.

```ts
// components/MetricBot/SearchBar.tsx
import React, { useState } from 'react';
import { searchBlogs } from '../../lib/searchUtils';
import { getFormattedBlogSummary } from '../../lib/displayUtils';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery) {
      const result = searchBlogs(searchQuery);
      setResults(result.map(r => ({
        ...r.item,
        summary: getFormattedBlogSummary(r.item.summary),
      }))); // Apply formatting to summary
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Cari blog..."
        className="search-input"
      />
      <ul className="search-results">
        {results.map(result => (
          <li key={result.id} className="search-result-item">
            <h3>{result.title}</h3>
            <p>{result.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
```

#### Kesimpulan

Pada langkah ini, kita:
- Menyimpan fungsi utilitas umum seperti normalisasi dan formatting teks di folder **`/utils`**.
- Menggunakan fungsi helper di **`/lib`** untuk mendukung pengolahan data dan pencarian.
- Mengintegrasikan fungsi-fungsi ini ke dalam komponen sehingga data dapat diproses dan ditampilkan dengan lebih baik.


#### 5. **Style dengan Tailwind CSS**

Tailwind CSS adalah framework utility-first yang memungkinkan kita untuk membuat desain dengan cepat dan konsisten dengan menggunakan kelas-kelas utility. Pada langkah ini, kita akan mengatur tampilan fitur pencarian menggunakan Tailwind CSS, termasuk styling untuk input pencarian, hasil pencarian, dan memastikan tampilan responsif.

#### 1. **Menyiapkan Tailwind CSS**

Pastikan Tailwind CSS sudah terinstal dan terkonfigurasi dalam proyek Next.js Anda. Jika belum, ikuti langkah-langkah berikut:

1. **Install Tailwind CSS:**

   ```bash
   npm install tailwindcss postcss autoprefixer
   ```

2. **Inisialisasi Tailwind CSS:**

   ```bash
   npx tailwindcss init -p
   ```

3. **Konfigurasi Tailwind CSS:**

   Edit **`tailwind.config.js`** untuk menambahkan path ke file-file Anda:

   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./pages/**/*.{js,ts,jsx,tsx}",
       "./components/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

4. **Tambahkan Tailwind ke **`globals.css`**:**

   Edit **`styles/globals.css`**:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

#### 2. **Menerapkan Styling pada Input Pencarian**

Beri style pada elemen input pencarian agar terlihat bersih dan modern.

```tsx
// components/MetricBot/SearchBar.tsx
import React, { useState } from 'react';
import { searchBlogs } from '../../lib/searchUtils';
import { getFormattedBlogSummary } from '../../lib/displayUtils';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    if (searchQuery) {
      const result = searchBlogs(searchQuery);
      setResults(result.map(r => ({
        ...r.item,
        summary: getFormattedBlogSummary(r.item.summary),
      }))); // Apply formatting to summary
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-bar p-4 max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Cari blog..."
        className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="search-results mt-4">
        {results.map(result => (
          <li key={result.id} className="search-result-item p-4 border-b last:border-b-0">
            <h3 className="text-lg font-semibold">{result.title}</h3>
            <p className="text-gray-700">{result.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
```

#### 3. **Menambahkan Styling pada Hasil Pencarian**

Berikan styling pada hasil pencarian agar tampak rapi dan mudah dibaca.

```tsx
// components/MetricBot/SearchBar.tsx
<ul className="search-results mt-4">
  {results.map(result => (
    <li key={result.id} className="search-result-item p-4 border-b last:border-b-0 hover:bg-gray-100 transition duration-150 ease-in-out">
      <h3 className="text-lg font-semibold">{result.title}</h3>
      <p className="text-gray-700">{result.summary}</p>
    </li>
  ))}
</ul>
```

#### 4. **Menerapkan Tampilan Responsif**

Gunakan kelas-kelas responsif Tailwind CSS untuk memastikan bahwa elemen pencarian dan hasil pencarian terlihat baik di berbagai ukuran layar.

```tsx
// components/MetricBot/SearchBar.tsx
<div className="search-bar p-4 max-w-md mx-auto">
  <input
    type="text"
    value={query}
    onChange={handleSearch}
    placeholder="Cari blog..."
    className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <ul className="search-results mt-4">
    {results.map(result => (
      <li key={result.id} className="search-result-item p-4 border-b last:border-b-0 hover:bg-gray-100 transition duration-150 ease-in-out">
        <h3 className="text-lg font-semibold">{result.title}</h3>
        <p className="text-gray-700">{result.summary}</p>
      </li>
    ))}
  </ul>
</div>
```

- **`max-w-md mx-auto`**: Membatasi lebar maksimum input pencarian dan menempatkannya di tengah.
- **`p-4`**: Memberikan padding di sekitar elemen.
- **`w-full`**: Membuat input mengambil lebar penuh dari kontainernya.
- **`border rounded-lg shadow-sm`**: Menambahkan border, sudut membulat, dan bayangan ringan pada input.
- **`focus:outline-none focus:ring-2 focus:ring-blue-500`**: Menambahkan efek fokus dengan ring biru pada input.
- **`hover:bg-gray-100 transition duration-150 ease-in-out`**: Menambahkan efek hover dengan perubahan warna latar belakang pada hasil pencarian.

### Kesimpulan

Pada langkah ini, kita telah menggunakan Tailwind CSS untuk:
- Mengatur styling input pencarian.
- Memberikan tampilan pada hasil pencarian.
- Menerapkan styling responsif untuk memastikan elemen pencarian terlihat baik di berbagai ukuran layar.



#### 6. **Integrasi ke dalam Menu MetricBot**

Pada langkah ini, kita akan menambahkan menu **MetricBot** ke bagian navigasi situs sehingga pengguna dapat mengakses fitur pencarian dengan mudah. Kita akan memastikan bahwa menu ini terintegrasi dengan baik dengan navigasi situs yang ada dan dapat diakses dengan mudah oleh pengguna.

#### 1. **Menyiapkan Komponen Navigasi**

Pastikan Anda sudah memiliki komponen navigasi yang digunakan di situs Anda. Jika belum, kita akan membuatnya atau menyesuaikannya dengan menambahkan menu **MetricBot**.

##### 1.1. **Membuat Komponen Navigasi (Jika Belum Ada)**

Berikut adalah contoh dasar komponen navigasi dengan menu **MetricBot**:

```tsx
// components/Navigation.tsx
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-white text-lg font-bold">Home</a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/metricbot">
              <a className="text-white hover:text-gray-400">MetricBot</a>
            </Link>
          </li>
          {/* Tambahkan menu lain di sini */}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
```

Di sini, kami menggunakan Tailwind CSS untuk styling navigasi, termasuk latar belakang gelap dan teks putih.

#### 2. **Menambahkan Halaman untuk MetricBot**

Buat halaman baru di Next.js untuk menampilkan fitur pencarian **MetricBot**.

##### 2.1. **Membuat Halaman MetricBot**

Tambahkan halaman **`/pages/metricbot.tsx`**:

```tsx
// pages/metricbot.tsx
import React from 'react';
import SearchBar from '../components/metricBot/SearchBar';

const MetricBotPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">MetricBot</h1>
      <SearchBar />
    </div>
  );
};

export default MetricBotPage;
```

Halaman ini akan menampilkan komponen pencarian **MetricBot** yang telah kita buat sebelumnya.

#### 3. **Memperbarui Navigasi dengan Menu MetricBot**

Pastikan menu **MetricBot** ditambahkan ke navigasi dan mengarah ke halaman yang telah dibuat.

##### 3.1. **Menambahkan Link ke Menu MetricBot**

Edit komponen navigasi yang telah dibuat sebelumnya untuk memastikan menu **MetricBot** dapat diakses:

```tsx
// components/Navigation.tsx
import Link from 'next/link';

const Navigation: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <a className="text-white text-lg font-bold">Home</a>
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/metricbot">
              <a className="text-white hover:text-gray-400">MetricBot</a>
            </Link>
          </li>
          {/* Tambahkan menu lain di sini */}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
```

#### 4. **Mengintegrasikan Navigasi ke Halaman Utama**

Pastikan komponen navigasi digunakan di halaman utama atau layout situs Anda.

##### 4.1. **Menggunakan Navigasi di Halaman Utama**

Misalnya, di **`/pages/_app.tsx`**:

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app';
import Navigation from '../components/Navigation';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navigation />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

Dengan ini, komponen navigasi akan muncul di setiap halaman, termasuk halaman **MetricBot**.

#### 5. **Mengujinya**

Pastikan untuk menguji navigasi untuk memastikan bahwa menu **MetricBot** muncul di navigasi dan mengarah ke halaman pencarian dengan benar. Klik pada menu **MetricBot** untuk memastikan bahwa halaman **MetricBot** dengan fitur pencarian tampil dengan benar.

#### Kesimpulan

Pada langkah ini, kita telah:
- Menyiapkan komponen navigasi dengan menu **MetricBot**.
- Membuat halaman **MetricBot** yang menampilkan fitur pencarian.
- Memperbarui navigasi untuk mengarah ke halaman **MetricBot**.
- Mengintegrasikan navigasi ke halaman utama dan mengujinya.
