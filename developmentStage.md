Integrasi **Metric Maintenance** yang di-hosting di Netlify dengan OpenAI API untuk mendukung chatbot bisa dilakukan dengan beberapa langkah. Di bawah ini adalah panduan lengkap yang menjelaskan bagaimana kamu dapat menghubungkan OpenAI API dengan situs yang sudah berjalan di Netlify.

- [1. **Membuat API Key dari OpenAI**](#1-membuat-api-key-dari-openai)
- [2. **Menambahkan API Key ke Lingkungan Netlify (Environment Variables)**](#2-menambahkan-api-key-ke-lingkungan-netlify-environment-variables)
- [3. **Membuat API Endpoint di Next.js**](#3-membuat-api-endpoint-di-nextjs)
- [4. **Frontend Chatbot**](#4-frontend-chatbot)
- [5. **Pengujian dan Deploy**](#5-pengujian-dan-deploy)
- [6. **Pengelolaan Quota dan Penggunaan**](#6-pengelolaan-quota-dan-penggunaan)
- [7. **Keamanan dan Skalabilitas**](#7-keamanan-dan-skalabilitas)
- [8. **Struktur folder**](#8-struktur-folder)
  - [1. **Simpan Data Statis di Folder `data`**](#1-simpan-data-statis-di-folder-data)
  - [2. **Membuat API Route dengan TypeScript**](#2-membuat-api-route-dengan-typescript)
  - [3. **Mengakses Data Statis di Frontend dengan TypeScript**](#3-mengakses-data-statis-di-frontend-dengan-typescript)
  - [4. **Penjelasan Kode Frontend dengan TypeScript**:](#4-penjelasan-kode-frontend-dengan-typescript)
- [9. **Mengembangkan UI dengan Bubble**](#9-mengembangkan-ui-dengan-bubble)
  - [1. **Struktur Bubble Chat dengan Tailwind CSS**](#1-struktur-bubble-chat-dengan-tailwind-css)
  - [2. **Pengembangan `ChatMessages` dengan Bubble Chat**](#2-pengembangan-chatmessages-dengan-bubble-chat)
    - [**ChatMessages.tsx**](#chatmessagestsx)
  - [3. **Pengembangan `ChatInput`**](#3-pengembangan-chatinput)
  - [**ChatInput.tsx**](#chatinputtsx)
  - [4. **Pengembangan Komponen Utama `Chatbot.tsx`**](#4-pengembangan-komponen-utama-chatbottsx)
  - [**Chatbot.tsx**](#chatbottsx)
  - [5. **Hasil Akhir**](#5-hasil-akhir)
  - [6. **Desain Responsif**](#6-desain-responsif)
  - [Screenshot Mockup](#screenshot-mockup)
- [Menambahkan Spinner pada **MetricBot**](#menambahkan-spinner-pada-metricbot)
  - [1. **Pengaturan State Loading**](#1-pengaturan-state-loading)
  - [2. **Komponen Spinner**](#2-komponen-spinner)
  - [3. **Menampilkan Spinner Selama Proses**](#3-menampilkan-spinner-selama-proses)
  - [Implementasi](#implementasi)
    - [1. **Tambahkan State Loading di `Chatbot.tsx`**](#1-tambahkan-state-loading-di-chatbottsx)
    - [2. **Buat Komponen Spinner**](#2-buat-komponen-spinner)
    - [3. **Modifikasi `ChatMessages.tsx` (Opsional)**](#3-modifikasi-chatmessagestsx-opsional)
  - [4. **Hasil Akhir**](#4-hasil-akhir)
  - [5. **Tampilan Tailwind Spinner**](#5-tampilan-tailwind-spinner)
- [10. **Integrasi MetricBot - Searching Blog**](#10-integrasi-metricbot---searching-blog)
  - [1. **Mengatur Struktur Folder**](#1-mengatur-struktur-folder)
  - [2. **Mengintegrasikan Markdown dengan Chatbot**](#2-mengintegrasikan-markdown-dengan-chatbot)
  - [3. **Meningkatkan UX dengan Tailwind CSS**](#3-meningkatkan-ux-dengan-tailwind-css)
  - [4. **Peningkatan Fitur Chatbot**](#4-peningkatan-fitur-chatbot)
  - [5. **Caching dan Performa**](#5-caching-dan-performa)
  - [6. **Peningkatan Fitur Chatbot dengan searching menggunakan Fuse.js**](#6-peningkatan-fitur-chatbot-dengan-searching-menggunakan-fusejs)
    - [**Keunggulan Fuse.js**](#keunggulan-fusejs)
    - [**Cara Kerja Fuse.js**](#cara-kerja-fusejs)
    - [**Instalasi Fuse.js**](#instalasi-fusejs)
    - [**Contoh Penggunaan Fuse.js**](#contoh-penggunaan-fusejs)
      - [1. **Data Sederhana**](#1-data-sederhana)
      - [2. **Mengatur Fuse.js**](#2-mengatur-fusejs)
      - [3. **Melakukan Pencarian**](#3-melakukan-pencarian)
      - [4. **Mengatur Tingkat Fuzziness**](#4-mengatur-tingkat-fuzziness)
    - [**Pengaturan Lanjutan Fuse.js**](#pengaturan-lanjutan-fusejs)
    - [**Mengintegrasikan Fuse.js dalam MetricBot**](#mengintegrasikan-fusejs-dalam-metricbot)
- [**1. Menyiapkan Parsing Markdown**](#1-menyiapkan-parsing-markdown)
- [**2. Mengatur Fuse.js untuk Pencarian**](#2-mengatur-fusejs-untuk-pencarian)
- [**3. Menerapkan Pencarian dalam Chatbot**](#3-menerapkan-pencarian-dalam-chatbot)
- [**4. Penanganan Data Multidimensi (Array)**](#4-penanganan-data-multidimensi-array)
- [**5. Penyesuaian Performa dengan Caching**](#5-penyesuaian-performa-dengan-caching)
- [**6. Memperbaiki Respons Chatbot**](#6-memperbaiki-respons-chatbot)
- [**7. Mengelola Tingkat Relevansi dengan Threshold**](#7-mengelola-tingkat-relevansi-dengan-threshold)
- [**8. Mengatur Bobot Prioritas Pencarian**](#8-mengatur-bobot-prioritas-pencarian)
- [**Kesimpulan**](#kesimpulan)
- [**1. Pengaturan Dasar `next-contentlayer`**](#1-pengaturan-dasar-next-contentlayer)
- [**2. Integrasi dengan Fuse.js untuk Pencarian**](#2-integrasi-dengan-fusejs-untuk-pencarian)
  - [**Mengambil Data Artikel dari `next-contentlayer`:**](#mengambil-data-artikel-dari-next-contentlayer)
  - [**Integrasi dengan Fuse.js:**](#integrasi-dengan-fusejs)
- [**3. Penggunaan Dinamis dengan ISR (Incremental Static Regeneration)**](#3-penggunaan-dinamis-dengan-isr-incremental-static-regeneration)
- [**4. Penanganan Markdown yang Lebih Kompleks**](#4-penanganan-markdown-yang-lebih-kompleks)
- [**5. Optimalisasi Pencarian Berdasarkan Bobot (Weighted Search)**](#5-optimalisasi-pencarian-berdasarkan-bobot-weighted-search)
- [**Kesimpulan**](#kesimpulan-1)
- [**1. Mengganti Nama Document Type:**](#1-mengganti-nama-document-type)
- [**2. Mengganti Pemanggilan Data:**](#2-mengganti-pemanggilan-data)
- [**3. Penyesuaian Fuse.js:**](#3-penyesuaian-fusejs)
- [**4. Nama Variabel dan Komponen:**](#4-nama-variabel-dan-komponen)
- [**Kesimpulan:**](#kesimpulan-2)

### 1. **Membuat API Key dari OpenAI**

Sebelum memulai, pastikan kamu sudah memiliki **API Key** dari OpenAI. API Key ini diperlukan untuk mengakses layanan OpenAI API, yang akan digunakan oleh chatbot untuk menghasilkan respons.

- Buka **[dashboard OpenAI](https://platform.openai.com/account/api-keys)**.
- Buat **API Key** yang akan digunakan dalam aplikasi.
- Simpan API Key tersebut karena akan digunakan dalam kode integrasi.

### 2. **Menambahkan API Key ke Lingkungan Netlify (Environment Variables)**

Jangan meletakkan API Key secara langsung dalam kode yang di-_deploy_ karena berisiko keamanan. Sebagai gantinya, gunakan **environment variables** di Netlify.

- Login ke akun **Netlify**.
- Pilih proyek **Metric Maintenance**.
- Klik pada bagian **Site Settings**, lalu pilih **Environment**.
- Tambahkan variabel environment baru:
  - Key: `OPENAI_API_KEY`
  - Value: (masukkan API Key OpenAI kamu)
- Klik **Save** untuk menyimpan environment variable ini.

Dengan cara ini, API Key tidak akan terpapar dalam kode sumber, tetapi tetap dapat diakses oleh aplikasi yang di-_deploy_ di Netlify.

### 3. **Membuat API Endpoint di Next.js**

Pada **Next.js 13+** dengan **app directory** yang baru, struktur API route akan berada di bawah folder `/app/api` daripada di `/pages/api`. Kita bisa membuat API route untuk berinteraksi dengan OpenAI API seperti ini:

- Buat direktori `app/api/chatbot/route.js`:

  ```javascript
  // app/api/chatbot/route.js
  import { NextResponse } from 'next/server'

  export async function POST(request) {
    const { prompt } = await request.json()

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003', // atau model lain
        prompt: prompt,
        max_tokens: 150,
      }),
    })

    const data = await response.json()

    return NextResponse.json({ result: data.choices[0].text })
  }
  ```

  - **Penjelasan Kode**:
    - Menggunakan `NextResponse` dari Next.js app routing.
    - API route ini menerima **POST request** dengan _prompt_ yang dikirim dari klien dan kemudian mengirimkan permintaan ke OpenAI API.
    - API Key diambil dari **environment variables** melalui `process.env.OPENAI_API_KEY`.

### 4. **Frontend Chatbot**

Untuk frontend yang berkomunikasi dengan API ini, kamu dapat membuat halaman di `app/chat/page.js`:

```javascript
'use client'

import { useState } from 'react'

export default function Chatbot() {
  const [input, setInput] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input }),
    })

    const data = await res.json()
    setResponse(data.result)
  }

  return (
    <div>
      <h1>Metric Maintenance Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya chatbot"
        />
        <button type="submit">Kirim</button>
      </form>
      <div>
        <h3>Respons dari Chatbot:</h3>
        <p>{response}</p>
      </div>
    </div>
  )
}
```

- **Penjelasan Kode**:
  - **useState** digunakan untuk mengelola input dan respons chatbot.
  - Data dikirim ke endpoint API yang kita buat tadi (`/api/chatbot`) dan respons dari OpenAI ditampilkan di halaman.

### 5. **Pengujian dan Deploy**

Setelah melakukan konfigurasi di atas, aplikasi dapat diuji dan di-_deploy_ di Netlify:

- **Pengujian lokal**:
  Jalankan proyek di lokal dengan `pnpm dev` dan buka aplikasi di browser (`localhost:3000`).
  Coba ajukan pertanyaan ke chatbot, dan pastikan permintaan dikirim ke OpenAI API dan respons ditampilkan.

- **Deploy di Netlify**:
  Setelah semuanya siap, _commit_ perubahan dan dorong kode ke repositori git yang terhubung dengan Netlify. Netlify secara otomatis akan memulai proses **build dan deploy**.

Setelah deploy selesai, chatbot akan berfungsi di server Netlify.

### 6. **Pengelolaan Quota dan Penggunaan**

Perhatikan bahwa OpenAI API memiliki batasan **quota** tergantung pada paket yang digunakan. Pantau penggunaan API melalui **dashboard OpenAI** untuk memastikan tidak ada masalah dengan kuota atau biaya berlebih.

Jika ingin menghemat penggunaan token atau mengoptimalkan kinerja chatbot, kamu bisa mempertimbangkan:

- Menggunakan **model yang lebih kecil** atau lebih efisien seperti `gpt-3.5-turbo`.
- **Membatasi panjang prompt** atau token yang digunakan dalam permintaan API.

### 7. **Keamanan dan Skalabilitas**

Karena aplikasi ini di-hosting di Netlify dan berinteraksi dengan OpenAI API:

- Pastikan **API Key OpenAI** hanya diakses dari sisi server dan tidak bocor ke klien.
- Gunakan fitur **Netlify Functions** atau **serverless architecture** untuk mempermudah penanganan beban yang lebih tinggi jika pengguna aplikasi bertambah banyak.

### 8. **Struktur folder**

#### 1. **Simpan Data Statis di Folder `data`**

Buat folder baru bernama `data` di dalam proyek Next.js, dan simpan file JSON berisi percakapan statis.

**Struktur Folder:**

```
/app
  /api
  /chatbot
  /data
    conversations.json
```

**Isi file `conversations.json`:**

```json
[
  {
    "user": "Bagaimana cara merawat kompresor?",
    "bot": "Untuk perawatan kompresor, Anda perlu memeriksa tekanan udara secara rutin, membersihkan filter udara, dan mengganti oli setiap 1000 jam kerja atau sesuai rekomendasi pabrik."
  },
  {
    "user": "Apa standar SHE untuk pengelasan di area pabrik?",
    "bot": "Standar SHE untuk pengelasan di area pabrik meliputi penggunaan alat pelindung diri (APD) seperti kacamata pelindung, sarung tangan tahan panas, serta memastikan ventilasi yang cukup untuk menghindari asap berbahaya."
  }
  // Tambahkan lebih banyak percakapan sesuai kebutuhan
]
```

**Struktur Folder:**

```
/app
  /api
  /chatbot
  /data
    conversations.json
```

#### 2. **Membuat API Route dengan TypeScript**

Buat file `route.ts` di dalam folder `/app/api/chatbot`.

**Kode di `app/api/chatbot/route.ts`:**

```typescript
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const filePath = path.join(process.cwd(), 'app', 'data', 'conversations.json')
  const fileData = fs.readFileSync(filePath, 'utf-8')
  const conversations = JSON.parse(fileData)

  return NextResponse.json(conversations)
}
```

- **Penjelasan Kode**:
  - Kode tetap serupa dengan sebelumnya, tetapi file ini menggunakan ekstensi `.ts` untuk TypeScript.
  - Menggunakan **Next.js API routes** yang mendukung **TypeScript** secara native.

#### 3. **Mengakses Data Statis di Frontend dengan TypeScript**

Di halaman frontend, kita akan menggunakan TypeScript untuk mendefinisikan tipe data dan memastikan aplikasi lebih aman dari kesalahan tipe.

**Kode di `app/chat/page.tsx`:**

```typescript
'use client';

import { useEffect, useState, FormEvent } from 'react';

// Definisikan tipe untuk percakapan
interface Conversation {
  user: string;
  bot: string;
}

export default function Chatbot() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ user?: string; bot?: string }>>([]);
  const [conversationData, setConversationData] = useState<Conversation[]>([]);

  // Fetch data statis dari API saat komponen di-mount
  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch('/api/chatbot');
      const data: Conversation[] = await res.json();
      setConversationData(data);
    };
    fetchConversations();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage = input;
    setMessages([...messages, { user: userMessage }]);

    // Cari respons dari data statis
    const response = conversationData.find(conv => conv.user.toLowerCase() === userMessage.toLowerCase());
    const botMessage = response ? response.bot : "Maaf, saya tidak memiliki jawaban untuk pertanyaan tersebut.";

    setMessages((prevMessages) => [...prevMessages, { bot: botMessage }]);
    setInput('');
  };

  return (
    <div>
      <h1>MetricBot - Chatbot</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.user && <p><strong>Anda:</strong> {msg.user}</p>}
            {msg.bot && <p><strong>MetricBot:</strong> {msg.bot}</p>}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanya sesuatu..."
        />
        <button type="submit">Kirim</button>
      </form>
    </div>
  );
}
```

#### 4. **Penjelasan Kode Frontend dengan TypeScript**:

- **Conversation**: Tipe data yang mendefinisikan struktur percakapan, termasuk `user` dan `bot`.
- **useState**: Tipe data ditambahkan untuk memastikan `input` adalah string dan `messages` adalah array dari objek dengan properti opsional `user` dan `bot`.
- **handleSubmit**: Fungsi ini bertipe **FormEvent** yang memastikan tipe event form pada React.

### 9. **Mengembangkan UI dengan Bubble**

Untuk membuat tampilan chatbot menyerupai aplikasi chat seperti WhatsApp atau Telegram, kita bisa menggunakan Tailwind CSS untuk membuat **bubble chat** yang memisahkan antara pesan pengguna dan respons bot. Berikut adalah pengembangan tampilan **UI chatbot** yang lebih interaktif dengan balon (bubble) chat.

#### 1. **Struktur Bubble Chat dengan Tailwind CSS**

Dengan Tailwind CSS, kita dapat menggunakan kelas-kelas seperti `rounded-full`, `bg-blue-500`, dan `bg-gray-300` untuk membuat bubble chat yang terlihat seperti di WhatsApp atau Telegram. Pesan dari pengguna akan memiliki warna dan posisi berbeda dari pesan bot.

#### 2. **Pengembangan `ChatMessages` dengan Bubble Chat**

Di komponen `ChatMessages.tsx`, kita akan mengatur agar pesan pengguna berada di sebelah kanan dengan warna berbeda, sedangkan pesan dari bot di sebelah kiri. Berikut adalah kode yang diperbarui:

##### **ChatMessages.tsx**

```typescript
// app/components/chatbot/ChatMessages.tsx

interface Message {
  user?: string;
  bot?: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4 h-80 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className={`mb-3 flex ${msg.user ? 'justify-end' : 'justify-start'}`}>
          {msg.user && (
            <div className="bg-blue-500 text-white py-2 px-4 rounded-lg max-w-xs md:max-w-md">
              {msg.user}
            </div>
          )}
          {msg.bot && (
            <div className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg max-w-xs md:max-w-md">
              {msg.bot}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
```

#### 3. **Pengembangan `ChatInput`**

Bagian input juga perlu disesuaikan agar tampak lebih interaktif dan nyaman digunakan, dengan menggunakan kelas-kelas Tailwind yang membuat input lebih modern.

#### **ChatInput.tsx**

```typescript
// app/components/chatbot/ChatInput.tsx

interface ChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ChatInput = ({ input, setInput, handleSubmit }: ChatInputProps) => {
  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4 mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Tanyakan sesuatu..."
        className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
      >
        Kirim
      </button>
    </form>
  );
};

export default ChatInput;
```

#### 4. **Pengembangan Komponen Utama `Chatbot.tsx`**

Gabungkan `ChatMessages` dan `ChatInput` dalam komponen utama chatbot dengan tampilan yang lebih menarik. Pastikan untuk menambahkan ruang di antara pesan dan input.

#### **Chatbot.tsx**

```typescript
// app/components/chatbot/Chatbot.tsx
'use client';

import { useState, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

interface Conversation {
  user: string;
  bot: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<{ user?: string; bot?: string }[]>([]);
  const [input, setInput] = useState('');
  const [conversationData, setConversationData] = useState<Conversation[]>([]);

  // Ambil data percakapan dari API
  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch('/api/chatbot');
      const data = await res.json();
      setConversationData(data);
    };

    fetchConversations();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userMessage = input.trim();
    setMessages([...messages, { user: userMessage }]);

    // Cari respons dari bot berdasarkan input user
    const response = conversationData.find(
      (conv) => conv.user.toLowerCase().includes(userMessage.toLowerCase())
    );

    const botMessage = response
      ? response.bot
      : 'Maaf, saya tidak memiliki jawaban untuk pertanyaan tersebut.';

    setMessages((prevMessages) => [...prevMessages, { bot: botMessage }]);
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">MetricBot</h1>
      <ChatMessages messages={messages} />
      <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Chatbot;
```

#### 5. **Hasil Akhir**

1. **Pesan pengguna** akan ditampilkan di sisi kanan dengan warna **biru**, tampak seperti WhatsApp atau Telegram.
2. **Pesan bot** ditampilkan di sisi kiri dengan warna **abu-abu**.
3. **Input pengguna** akan menggunakan kelas Tailwind untuk tampilan yang lebih modern dan responsif.

#### 6. **Desain Responsif**

Dengan **Tailwind CSS**, tampilan secara otomatis akan responsif, sehingga chatbot tetap terlihat rapi di perangkat mobile maupun desktop.

#### Screenshot Mockup

- **Pesan Pengguna**: Bubble biru di sebelah kanan.
- **Pesan Bot**: Bubble abu-abu di sebelah kiri.
- **Input Pesan**: Input dengan transisi lembut dan tombol kirim berbentuk bulat.

Dengan cara ini, chatbot Anda akan memiliki UX yang lebih menarik dan modern, menyerupai aplikasi chat populer seperti WhatsApp dan Telegram.

### Menambahkan Spinner pada **MetricBot**

Menambahkan fitur **spinner** atau **loading indicator** saat **MetricBot** sedang memproses permintaan akan sangat membantu dalam meningkatkan **UX** (User Experience). Spinner ini akan muncul saat bot sedang mengambil data atau memproses jawaban, sehingga pengguna tahu bahwa ada proses yang sedang berjalan. Kita bisa menggunakan Tailwind CSS dan beberapa fungsi sederhana di React untuk mengimplementasikan fitur ini.

#### 1. **Pengaturan State Loading**

Kita perlu menambahkan state `loading` di komponen `Chatbot.tsx`, yang akan menjadi penanda apakah bot sedang memproses jawaban atau tidak.

#### 2. **Komponen Spinner**

Spinner bisa dibuat menggunakan Tailwind CSS atau library lain, namun kita akan fokus membuatnya dengan Tailwind CSS agar konsisten.

#### 3. **Menampilkan Spinner Selama Proses**

Saat pengguna mengirim pesan, spinner akan muncul, dan ketika jawaban dari bot diterima, spinner akan hilang.

#### Implementasi

##### 1. **Tambahkan State Loading di `Chatbot.tsx`**

Kita tambahkan state baru bernama `loading`, yang akan menjadi `true` saat bot sedang memproses respons, dan kembali menjadi `false` setelah respons diterima.

```typescript
// app/components/chatbot/Chatbot.tsx
'use client';

import { useState, useEffect } from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';
import Spinner from './Spinner'; // Komponen Spinner

interface Conversation {
  user: string;
  bot: string;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<{ user?: string; bot?: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);  // Tambahkan state loading
  const [conversationData, setConversationData] = useState<Conversation[]>([]);

  // Ambil data percakapan dari API
  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch('/api/chatbot');
      const data = await res.json();
      setConversationData(data);
    };

    fetchConversations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userMessage = input.trim();
    setMessages([...messages, { user: userMessage }]);
    setLoading(true);  // Set loading ke true ketika pesan dikirim

    // Cari respons dari bot berdasarkan input user
    const response = conversationData.find(
      (conv) => conv.user.toLowerCase().includes(userMessage.toLowerCase())
    );

    const botMessage = response
      ? response.bot
      : 'Maaf, saya tidak memiliki jawaban untuk pertanyaan tersebut.';

    // Simulasi waktu tunggu (misal 2 detik)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setMessages((prevMessages) => [...prevMessages, { bot: botMessage }]);
    setLoading(false);  // Set loading ke false setelah bot memberikan respons
    setInput('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">MetricBot</h1>
      <ChatMessages messages={messages} />
      {loading && <Spinner />}  {/* Tampilkan spinner saat loading */}
      <ChatInput input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Chatbot;
```

##### 2. **Buat Komponen Spinner**

Spinner akan muncul ketika state `loading` menjadi `true`. Spinner ini menggunakan Tailwind CSS untuk menambahkan animasi sederhana.

```typescript
// app/components/chatbot/Spinner.tsx
const Spinner = () => {
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
```

##### 3. **Modifikasi `ChatMessages.tsx` (Opsional)**

Jika Anda ingin menambahkan tampilan spinner di bagian percakapan, tepat setelah pengguna mengirim pesan, Anda bisa mengatur spinner agar muncul di bagian `ChatMessages`.

```typescript
// app/components/chatbot/ChatMessages.tsx

interface Message {
  user?: string;
  bot?: string;
}

interface ChatMessagesProps {
  messages: Message[];
  loading: boolean;  // Tambahkan loading sebagai prop
}

const ChatMessages = ({ messages, loading }: ChatMessagesProps) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg mb-4 h-80 overflow-y-auto">
      {messages.map((msg, index) => (
        <div key={index} className={`mb-3 flex ${msg.user ? 'justify-end' : 'justify-start'}`}>
          {msg.user && (
            <div className="bg-blue-500 text-white py-2 px-4 rounded-lg max-w-xs md:max-w-md">
              {msg.user}
            </div>
          )}
          {msg.bot && (
            <div className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg max-w-xs md:max-w-md">
              {msg.bot}
            </div>
          )}
        </div>
      ))}
      {loading && (  // Tambahkan spinner di dalam chat bubble
        <div className="flex justify-start">
          <div className="bg-gray-300 text-gray-900 py-2 px-4 rounded-lg max-w-xs md:max-w-md">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
```

#### 4. **Hasil Akhir**

- Saat pengguna mengirim pesan, spinner akan muncul di bawah chat bubble terakhir, menunjukkan bahwa bot sedang memproses jawabannya.
- Spinner akan hilang begitu bot memberikan respons.
- Spinner bisa ditampilkan sebagai komponen terpisah di bawah bagian chat atau di dalam chat bubble itu sendiri, tergantung preferensi desain.

#### 5. **Tampilan Tailwind Spinner**

Dengan menggunakan Tailwind CSS, Anda bisa mengubah warna dan ukuran spinner dengan mudah. Misalnya, mengganti warna menjadi merah dengan `border-red-500` atau mengubah ukuran menjadi lebih besar dengan `w-12 h-12`.

Spinner akan memberikan pengalaman pengguna yang lebih baik, terutama jika ada sedikit keterlambatan dalam pengambilan data atau pemrosesan respons dari bot.

### 10. **Integrasi MetricBot - Searching Blog**

#### 1. **Mengatur Struktur Folder**

Untuk mengelola artikel markdown dan integrasi dengan MetricBot, Anda bisa menyusun folder sebagai berikut:

- **`/components/chatbot`**: Untuk komponen chatbot dan UI.
- **`/data/articles`**: Untuk menyimpan artikel markdown.
- **`/lib`**: Untuk fungsi-fungsi helper, seperti pembaca file markdown.
- **`/utils`**: Untuk utilitas umum seperti parser markdown.

#### 2. **Mengintegrasikan Markdown dengan Chatbot**

**a. Membaca dan Mengurai Artikel Markdown**

Buat fungsi untuk membaca file markdown dan mengonversinya menjadi format yang bisa digunakan oleh chatbot. Anda bisa menggunakan pustaka seperti `marked` atau `remark` untuk parsing markdown.

**Contoh Fungsi Pembaca Markdown:**

```typescript
import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

export const getArticleContent = (filename: string): string => {
  const filePath = path.join(process.cwd(), 'data', 'articles', filename)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return marked.parse(fileContent)
}
```

**b. Menyajikan Artikel dalam Chatbot**

Sesuaikan MetricBot untuk mengakses dan menampilkan konten artikel. Misalnya, jika ada pertanyaan tentang topik tertentu, chatbot bisa mencari artikel yang relevan dan menampilkan isinya.

**Contoh Fungsi Pencarian Artikel:**

```typescript
import { getArticleContent } from '../lib/articleHelper'

export const handleUserQuery = (query: string): string => {
  const filename = findRelevantArticle(query) // Implementasikan logika pencarian
  if (filename) {
    return getArticleContent(filename)
  }
  return 'Maaf, saya tidak menemukan informasi yang relevan.'
}
```

#### 3. **Meningkatkan UX dengan Tailwind CSS**

Gunakan Tailwind CSS untuk mendesain antarmuka chatbot agar lebih menarik dan responsif. Anda bisa membuat komponen seperti:

- **`ChatbotContainer`**: Untuk membungkus chatbot.
- **`MessageBubble`**: Untuk balon pesan dari pengguna dan chatbot.
- **`InputField`**: Untuk kolom input pertanyaan.

**Contoh Komponen Chatbot dengan Tailwind CSS:**

```typescript
const ChatbotContainer: React.FC = () => (
  <div className="fixed bottom-0 right-0 p-4 w-full max-w-md">
    <div className="bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-col space-y-4">
        {/* Pesan dari chatbot dan pengguna */}
      </div>
      <input
        type="text"
        placeholder="Ketik pertanyaan..."
        className="w-full p-2 border border-gray-300 rounded-lg mt-2"
      />
    </div>
  </div>
);
```

#### 4. **Peningkatan Fitur Chatbot**

**a. Pencarian yang Lebih Baik**

Pertimbangkan untuk menggunakan fitur pencarian full-text dengan pustaka seperti `Fuse.js` jika artikel Anda banyak.

**b. Analisis dan Pelaporan**

Implementasikan logika untuk menganalisis pertanyaan pengguna dan memberikan umpan balik tentang topik yang paling sering ditanyakan atau area yang perlu ditingkatkan.

#### 5. **Caching dan Performa**

Untuk menghindari pembacaan file markdown setiap kali chatbot menerima pertanyaan, pertimbangkan untuk menggunakan caching. Ini dapat dilakukan dengan menyimpan hasil parsing artikel dalam memori atau menggunakan solusi caching seperti `Redis`.

#### 6. **Peningkatan Fitur Chatbot dengan searching menggunakan Fuse.js**

**Fuse.js** adalah pustaka JavaScript ringan yang digunakan untuk pencarian fuzzy (fuzzy search). Pencarian fuzzy memungkinkan pengguna untuk menemukan hasil meskipun kata kunci pencarian tidak sepenuhnya cocok dengan data yang ada. Ini sangat berguna untuk meningkatkan pengalaman pencarian, terutama ketika data atau kata kunci tidak selalu dieja dengan benar atau memiliki variasi kecil dalam teks.

##### **Keunggulan Fuse.js**

1. **Pencarian Fuzzy**: Fuse.js memungkinkan pencarian yang toleran terhadap kesalahan dalam input pencarian, seperti salah ketik atau penyebutan yang tidak tepat.
2. **Kinerja Cepat**: Meskipun berbasis JavaScript murni, Fuse.js tetap ringan dan cepat, bahkan dengan dataset yang cukup besar.
3. **Fleksibilitas**: Sangat fleksibel dalam hal konfigurasi, sehingga Anda dapat menentukan cara pencarian dilakukan, seperti pada properti objek tertentu atau dengan menyesuaikan tingkat fuzziness (tingkat toleransi kesalahan).
4. **Tidak Memerlukan Indexing**: Berbeda dengan beberapa mesin pencarian, Fuse.js tidak memerlukan pengindeksan data terlebih dahulu. Ini berarti data dapat langsung dicari tanpa proses persiapan yang rumit.

##### **Cara Kerja Fuse.js**

Fuse.js menggunakan algoritma pencocokan pola yang mengevaluasi seberapa mirip string pencarian dengan data yang ada. Setiap kali pengguna mengetik query, Fuse.js akan membandingkan string query tersebut dengan data dan memberikan skor kesamaan. Hasil pencarian disusun berdasarkan skor kesamaan, sehingga hasil yang lebih relevan akan muncul lebih dulu.

##### **Instalasi Fuse.js**

Anda dapat menginstal Fuse.js melalui **npm** atau **yarn** dengan perintah berikut:

```bash
npm install fuse.js
```

atau

```bash
yarn add fuse.js
```

##### **Contoh Penggunaan Fuse.js**

Misalkan kita memiliki kumpulan data artikel yang disimpan dalam array objek. Kita ingin melakukan pencarian berdasarkan judul atau konten artikel. Berikut adalah contoh bagaimana Anda bisa menggunakan Fuse.js:

###### 1. **Data Sederhana**

Misalkan Anda memiliki dataset sederhana seperti ini:

```typescript
const articles = [
  { title: 'Cara Memelihara Mesin', content: 'Panduan lengkap untuk memelihara mesin di pabrik.' },
  { title: 'Keamanan di Pabrik', content: 'Langkah-langkah keselamatan di pabrik kimia.' },
  {
    title: 'Pengoperasian Reaktor Kimia',
    content: 'Detail pengoperasian reaktor di pabrik kimia.',
  },
]
```

###### 2. **Mengatur Fuse.js**

Pertama, kita inisialisasi Fuse dengan data dan menentukan properti apa yang akan dicari:

```typescript
import Fuse from 'fuse.js'

const options = {
  keys: ['title', 'content'], // Tentukan properti yang akan dicari
  includeScore: true, // Menampilkan skor relevansi
  threshold: 0.3, // Tingkat toleransi pencarian, semakin rendah semakin ketat
}

const fuse = new Fuse(articles, options)
```

###### 3. **Melakukan Pencarian**

Misalnya, pengguna memasukkan kata "mesin", maka kita dapat mencari artikel yang relevan:

```typescript
const result = fuse.search('mesin')
console.log(result)
```

Output-nya akan berisi hasil pencarian yang menyertakan artikel-artikel yang relevan, beserta skor relevansinya:

```json
[
  {
    "item": {
      "title": "Cara Memelihara Mesin",
      "content": "Panduan lengkap untuk memelihara mesin di pabrik."
    },
    "score": 0.1
  }
]
```

###### 4. **Mengatur Tingkat Fuzziness**

`threshold` pada konfigurasi menentukan seberapa ketat pencocokan. Nilai `0` berarti pencarian harus persis sama dengan input, sementara nilai mendekati `1` akan memperbolehkan lebih banyak perbedaan.

Contoh, jika Anda ingin lebih toleran terhadap kesalahan ketik, tingkatkan `threshold` menjadi:

```typescript
const options = {
  keys: ['title', 'content'],
  includeScore: true,
  threshold: 0.5, // Lebih toleran terhadap ketidakcocokan
}
```

Dengan `threshold: 0.5`, jika pengguna salah ketik "mesim" (bukannya "mesin"), Fuse.js masih akan menampilkan hasil yang relevan.

##### **Pengaturan Lanjutan Fuse.js**

1. **`minMatchCharLength`**: Menentukan jumlah minimal karakter yang diperlukan dalam query sebelum Fuse.js mulai mencari.

   ```typescript
   const options = {
     keys: ['title', 'content'],
     minMatchCharLength: 3,
   }
   ```

2. **`distance`**: Menentukan seberapa jauh hasil pencarian dapat berbeda dari input. Semakin rendah nilainya, semakin ketat pencocokan.

   ```typescript
   const options = {
     keys: ['title', 'content'],
     distance: 100,
   }
   ```

3. **`shouldSort`**: Fuse.js secara default menyusun hasil berdasarkan relevansi. Anda dapat menonaktifkannya dengan mengatur `shouldSort: false`.

4. **`location`**: Menentukan posisi dalam string di mana pencarian dimulai.
   ```typescript
   const options = {
     keys: ['title', 'content'],
     location: 0, // Mulai pencarian dari awal string
   }
   ```

##### **Mengintegrasikan Fuse.js dalam MetricBot**

Dalam kasus situs **Metric Maintenance**, Anda dapat menggunakan Fuse.js untuk mencari artikel yang relevan berdasarkan pertanyaan pengguna. Misalnya, ketika pengguna bertanya tentang “pengoperasian mesin”, Fuse.js dapat digunakan untuk mencari artikel yang relevan di folder `blog`.

Contoh:

```typescript
import Fuse from 'fuse.js'
import { getAllArticles } from '../lib/articleHelper'

const articles = getAllArticles() // Fungsi untuk mengambil semua artikel markdown

const fuseOptions = {
  keys: ['title', 'content'],
  threshold: 0.4, // Toleransi pencarian
}

const fuse = new Fuse(articles, fuseOptions)

export const handleUserQuery = (query: string) => {
  const result = fuse.search(query)
  if (result.length > 0) {
    return result[0].item // Menampilkan artikel yang paling relevan
  } else {
    return 'Maaf, tidak ada artikel yang relevan.'
  }
}
```

Dengan struktur artikel markdown yang Anda gunakan (mengandung `title`, `tags`, `summary`, dan `content`), serta rencana untuk menggunakan **Fuse.js** dalam pencarian berdasarkan `title`, `tags`, dan `summary`, berikut adalah beberapa saran dan langkah implementasi untuk memaksimalkan pencarian dengan Fuse.js:

### **1. Menyiapkan Parsing Markdown**

Karena artikel disimpan dalam format markdown, pertama-tama Anda perlu menyiapkan fungsi untuk membaca dan mengurai file markdown tersebut. Untuk mempermudah, Anda bisa menggunakan pustaka seperti `gray-matter` untuk memproses metadata (seperti `title`, `authors`, `tags`, dll.) dari markdown.

**Instalasi `gray-matter` untuk parsing markdown:**

```bash
npm install gray-matter
```

**Contoh Fungsi untuk Membaca Markdown:**

```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export const getAllArticles = () => {
  const files = fs.readdirSync(path.join(process.cwd(), 'blog'))

  const articles = files.map((filename) => {
    const filePath = path.join(process.cwd(), 'blog', filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')

    // Menggunakan gray-matter untuk mengurai metadata dan konten
    const { data, content } = matter(fileContent)

    return {
      ...data, // Berisi title, authors, tags, summary
      content, // Isi markdown setelah metadata
    }
  })

  return articles
}
```

### **2. Mengatur Fuse.js untuk Pencarian**

Karena Anda ingin mencari berdasarkan `title`, `tags`, dan `summary`, berikut cara mengatur Fuse.js agar hanya memprioritaskan pencarian pada properti tersebut.

**Contoh Pengaturan Fuse.js:**

```typescript
import Fuse from 'fuse.js'

// Inisialisasi dataset artikel markdown
const articles = getAllArticles()

// Opsi pencarian menggunakan Fuse.js
const options = {
  keys: [
    'title', // Cari di judul artikel
    'tags', // Cari di tag (array)
    'summary', // Cari di ringkasan artikel
  ],
  threshold: 0.3, // Mengatur seberapa ketat pencarian
  includeScore: true, // Menyertakan skor relevansi
}

const fuse = new Fuse(articles, options)
```

### **3. Menerapkan Pencarian dalam Chatbot**

Dengan Fuse.js yang sudah diatur, Anda bisa melakukan pencarian di chatbot berdasarkan query pengguna. Misalnya, pengguna mengetikkan pertanyaan, dan Fuse.js akan mencari artikel yang relevan.

**Contoh Penerapan dalam Chatbot:**

```typescript
export const handleUserQuery = (query: string) => {
  const result = fuse.search(query)

  if (result.length > 0) {
    const topResult = result[0].item // Mengambil artikel dengan skor tertinggi

    return {
      title: topResult.title,
      summary: topResult.summary,
      tags: topResult.tags,
    } // Mengembalikan artikel yang relevan dalam format yang disesuaikan
  } else {
    return 'Maaf, tidak ada artikel yang sesuai dengan pencarian Anda.'
  }
}
```

### **4. Penanganan Data Multidimensi (Array)**

Karena properti `tags` adalah array, Fuse.js akan secara otomatis melakukan pencocokan pada setiap elemen di dalam array. Tidak ada konfigurasi tambahan yang diperlukan untuk mencocokkan data dalam array.

Misalnya, jika artikel memiliki `tags: ['maintenance', 'safety', 'operation']`, Fuse.js akan mencocokkan query seperti “maintenance” atau “safety” dengan elemen array tersebut.

### **5. Penyesuaian Performa dengan Caching**

Jika jumlah artikel bertambah banyak, Anda dapat mempertimbangkan implementasi caching untuk meningkatkan performa. Misalnya, setelah parsing markdown dilakukan, hasil parsing dapat disimpan dalam memori atau menggunakan solusi caching seperti `Redis` untuk akses lebih cepat.

### **6. Memperbaiki Respons Chatbot**

Untuk meningkatkan pengalaman pengguna, Anda bisa menampilkan informasi artikel yang lebih kaya setelah pencarian, seperti judul, ringkasan, atau tag yang relevan:

**Contoh Format Respons Chatbot:**

```typescript
export const handleUserQuery = (query: string) => {
  const result = fuse.search(query)

  if (result.length > 0) {
    const topResult = result[0].item // Artikel dengan skor tertinggi

    return `
      Artikel yang relevan:
      - **Judul**: ${topResult.title}
      - **Ringkasan**: ${topResult.summary}
      - **Tags**: ${topResult.tags.join(', ')}
    `
  } else {
    return 'Maaf, tidak ada artikel yang sesuai.'
  }
}
```

### **7. Mengelola Tingkat Relevansi dengan Threshold**

**`threshold`** dalam pengaturan Fuse.js memungkinkan Anda mengontrol seberapa ketat pencarian dilakukan. Jika pengguna sering salah ketik, Anda mungkin ingin menaikkan threshold, misalnya dari `0.3` menjadi `0.5`. Semakin tinggi nilai threshold, semakin toleran pencarian terhadap ketidaksesuaian input.

### **8. Mengatur Bobot Prioritas Pencarian**

Anda juga bisa memberikan bobot lebih besar pada properti tertentu. Misalnya, jika Anda ingin pencarian pada `title` lebih dominan dibandingkan `tags`, Anda bisa memberikan bobot lebih besar pada `title`:

```typescript
const options = {
  keys: [
    { name: 'title', weight: 0.7 }, // Prioritas lebih tinggi pada title
    { name: 'tags', weight: 0.3 }, // Bobot lebih kecil pada tags
    { name: 'summary', weight: 0.5 }, // Bobot sedang pada summary
  ],
  threshold: 0.3,
  includeScore: true,
}
```

### **Kesimpulan**

1. **Gray-matter** bisa digunakan untuk mengurai file markdown agar properti `title`, `tags`, `summary`, dan `content` bisa diakses dengan mudah.
2. **Fuse.js** adalah pilihan yang tepat untuk pencarian fuzzy berdasarkan beberapa properti (dalam hal ini `title`, `tags`, dan `summary`).
3. Mengatur bobot pencarian dan threshold memungkinkan Anda mengontrol seberapa relevan hasil pencarian.
4. Memperhatikan performa dengan caching akan sangat membantu jika jumlah artikel bertambah banyak.

Jika Anda memerlukan penjelasan lebih detail tentang cara mengimplementasikan atau menyesuaikan fitur ini, silakan tanyakan lagi!

Penggunaan **next-contentlayer** dalam pengelolaan markdown untuk MetricBot adalah pilihan yang sangat bagus, terutama karena `next-contentlayer` secara otomatis mengonversi file markdown ke dalam bentuk data yang bisa langsung digunakan dalam komponen React.

Berikut adalah beberapa saran untuk memaksimalkan penggunaan **next-contentlayer** bersama Fuse.js dalam MetricBot:

### **1. Pengaturan Dasar `next-contentlayer`**

`next-contentlayer` akan membantu mengonversi artikel markdown menjadi data statis yang dapat diakses di dalam komponen Next.js. Misalnya, jika Anda menyimpan artikel dalam folder `blog`, **next-contentlayer** akan mengubahnya menjadi objek data yang bisa digunakan untuk pencarian dan rendering di halaman.

Jika belum diatur, Anda bisa mengonfigurasi **next-contentlayer** dengan cara berikut:

1. **Instalasi `next-contentlayer`:**

   ```bash
   npm install next-contentlayer contentlayer
   ```

2. **Konfigurasi Contentlayer** dalam `contentlayer.config.ts`:

   ```typescript
   import { defineDocumentType, makeSource } from 'contentlayer/source-files'

   const Article = defineDocumentType(() => ({
     name: 'Article',
     filePathPattern: `blog/**/*.md`, // Sesuaikan path markdown
     fields: {
       title: { type: 'string', required: true },
       authors: { type: 'list', of: { type: 'string' }, required: true },
       tags: { type: 'list', of: { type: 'string' }, required: true },
       summary: { type: 'string', required: true },
       content: { type: 'string', required: true },
     },
   }))

   export default makeSource({
     contentDirPath: 'blog',
     documentTypes: [Article],
   })
   ```

3. **Inisialisasi Contentlayer dalam Next.js**: Di dalam `next.config.js`, tambahkan dukungan untuk contentlayer:
   ```javascript
   const { withContentlayer } = require('next-contentlayer')
   module.exports = withContentlayer({})
   ```

### **2. Integrasi dengan Fuse.js untuk Pencarian**

Setelah `next-contentlayer` mengonversi markdown menjadi objek data, Anda dapat langsung menggunakan data tersebut untuk pencarian dengan **Fuse.js**. Data yang dihasilkan oleh contentlayer akan otomatis tersedia sebagai properti `props` di halaman Next.js.

#### **Mengambil Data Artikel dari `next-contentlayer`:**

Setelah Anda mengonfigurasi contentlayer, Anda dapat menggunakan data markdown yang telah diolah dalam komponen Next.js. Misalnya:

```typescript
import { allArticles } from 'contentlayer/generated'

export const getStaticProps = async () => {
  return {
    props: {
      articles: allArticles, // Mendapatkan semua artikel markdown
    },
  }
}
```

#### **Integrasi dengan Fuse.js:**

Setelah semua artikel tersedia, Anda bisa melakukan pencarian menggunakan Fuse.js berdasarkan properti yang sudah ada (`title`, `tags`, `summary`):

```typescript
import Fuse from 'fuse.js'
import { allArticles } from 'contentlayer/generated'

const fuseOptions = {
  keys: ['title', 'tags', 'summary'],
  threshold: 0.3, // Toleransi pencarian
  includeScore: true, // Sertakan skor relevansi
}

const fuse = new Fuse(allArticles, fuseOptions)

export const handleUserQuery = (query: string) => {
  const result = fuse.search(query)

  if (result.length > 0) {
    return result[0].item // Artikel paling relevan
  } else {
    return 'Maaf, tidak ada artikel yang sesuai dengan pencarian Anda.'
  }
}
```

### **3. Penggunaan Dinamis dengan ISR (Incremental Static Regeneration)**

Dengan **next-contentlayer**, Anda juga bisa menggunakan fitur **Incremental Static Regeneration (ISR)** untuk memperbarui data markdown secara dinamis tanpa harus melakukan build ulang setiap kali ada perubahan artikel.

Misalnya, Anda bisa menggunakan ISR untuk memuat ulang data artikel dari markdown setiap beberapa detik, yang membuat bot Anda tetap dinamis.

Contoh penerapan ISR dalam fungsi `getStaticProps`:

```typescript
export const getStaticProps = async () => {
  return {
    props: {
      articles: allArticles,
    },
    revalidate: 60, // Memperbarui setiap 60 detik
  }
}
```

### **4. Penanganan Markdown yang Lebih Kompleks**

Jika Anda ingin mengintegrasikan konten yang lebih kompleks dalam artikel markdown, seperti menggunakan **remark** atau **rehype** untuk menambahkan elemen kustom atau memperkaya konten markdown, **contentlayer** mendukung transformasi tersebut.

Contoh menambahkan **remark plugin** untuk parsing konten markdown:

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const Article = defineDocumentType(() => ({
  name: 'Article',
  filePathPattern: `blog/**/*.md`,
  fields: {
    /* definisi fields sama seperti sebelumnya */
  },
}))

export default makeSource({
  contentDirPath: 'blog',
  documentTypes: [Article],
  markdown: {
    remarkPlugins: [remarkGfm], // Menambahkan dukungan Markdown Extra seperti tabel
    rehypePlugins: [rehypeSlug], // Menambahkan slug otomatis untuk heading
  },
})
```

### **5. Optimalisasi Pencarian Berdasarkan Bobot (Weighted Search)**

Jika Anda ingin menambahkan prioritas pada pencarian di `title`, `tags`, atau `summary`, Anda bisa menyesuaikan bobotnya di Fuse.js, seperti yang dijelaskan sebelumnya:

```typescript
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.7 }, // Prioritas tinggi untuk title
    { name: 'tags', weight: 0.5 }, // Bobot sedang untuk tags
    { name: 'summary', weight: 0.3 }, // Bobot rendah untuk summary
  ],
  threshold: 0.3,
  includeScore: true,
}
```

Dengan bobot yang tepat, hasil pencarian bisa lebih akurat, sesuai dengan prioritas properti yang lebih penting (misalnya `title` lebih penting dari `tags`).

### **Kesimpulan**

- **next-contentlayer** akan mempermudah pengelolaan markdown file dan mengubahnya menjadi objek data yang siap dipakai di komponen Next.js.
- Integrasi dengan **Fuse.js** memungkinkan pencarian artikel dengan kriteria `title`, `tags`, dan `summary` secara efisien.
- Anda bisa menyesuaikan pengalaman pencarian dengan bobot prioritas dan threshold sesuai kebutuhan.
- Memanfaatkan fitur ISR dari Next.js akan menjaga situs tetap dinamis dan artikel markdown dapat diperbarui tanpa build ulang.

Jika ada bagian yang perlu disempurnakan atau contoh kode yang perlu dikembangkan, saya siap membantu!

Jika istilah yang benar adalah **Blog**, maka penyesuaian hanya akan berada pada penamaan entitas di kode dan konfigurasi. Misalnya, di tempat yang sebelumnya menggunakan istilah **"Article"**, Anda hanya perlu menggantinya dengan **"Blog"**.

Berikut adalah penyesuaian yang relevan:

### **1. Mengganti Nama Document Type:**

Dalam konfigurasi **contentlayer**, ganti definisi `Article` menjadi `Blog`.

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

const Blog = defineDocumentType(() => ({
  name: 'Blog', // Mengganti 'Article' dengan 'Blog'
  filePathPattern: `blog/**/*.md`,
  fields: {
    title: { type: 'string', required: true },
    authors: { type: 'list', of: { type: 'string' }, required: true },
    tags: { type: 'list', of: { type: 'string' }, required: true },
    summary: { type: 'string', required: true },
    content: { type: 'string', required: true },
  },
}))

export default makeSource({
  contentDirPath: 'blog',
  documentTypes: [Blog], // Sesuaikan dengan nama 'Blog'
})
```

### **2. Mengganti Pemanggilan Data:**

Saat mengambil data menggunakan `contentlayer`, ganti pemanggilan dari `allArticles` menjadi `allBlogs`:

```typescript
import { allBlogs } from 'contentlayer/generated' // Menggunakan 'Blog'

export const getStaticProps = async () => {
  return {
    props: {
      blogs: allBlogs, // Ganti 'articles' dengan 'blogs'
    },
  }
}
```

### **3. Penyesuaian Fuse.js:**

Untuk pencarian menggunakan Fuse.js, ganti juga referensi dari `articles` ke `blogs`.

```typescript
import Fuse from 'fuse.js'
import { allBlogs } from 'contentlayer/generated' // Menggunakan 'Blog'

const fuseOptions = {
  keys: ['title', 'tags', 'summary'],
  threshold: 0.3,
  includeScore: true,
}

const fuse = new Fuse(allBlogs, fuseOptions) // Ganti 'allArticles' dengan 'allBlogs'

export const handleUserQuery = (query: string) => {
  const result = fuse.search(query)

  if (result.length > 0) {
    return result[0].item // Pencarian pada 'Blog'
  } else {
    return 'Maaf, tidak ada blog yang sesuai dengan pencarian Anda.'
  }
}
```

### **4. Nama Variabel dan Komponen:**

Jika Anda memiliki variabel atau komponen yang menggunakan istilah `Article`, ganti menjadi `Blog` agar sesuai dengan penamaan yang baru.

Contoh di komponen React:

```typescript
const BlogComponent = ({ blogs }) => {
  return blogs.map(blog => (
    <div key={blog.title}>
      <h1>{blog.title}</h1>
      <p>{blog.summary}</p>
    </div>
  ));
};
```

### **Kesimpulan:**

Perubahan utama adalah mengganti istilah dari **Article** ke **Blog** di semua tempat, termasuk definisi document type di `contentlayer`, pemanggilan data, serta penggunaan di Fuse.js dan komponen React.
