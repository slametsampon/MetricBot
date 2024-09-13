Integrasi **Metric Maintenance** yang di-hosting di Netlify dengan OpenAI API untuk mendukung chatbot bisa dilakukan dengan beberapa langkah. Di bawah ini adalah panduan lengkap yang menjelaskan bagaimana kamu dapat menghubungkan OpenAI API dengan situs yang sudah berjalan di Netlify.

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

Dengan langkah-langkah di atas, kamu bisa mengintegrasikan chatbot berbasis OpenAI API ke dalam situs **Metric Maintenance** yang di-hosting di Netlify. Jika ada pertanyaan lebih lanjut tentang langkah-langkah ini atau fitur tambahan, beri tahu saya!

Baik, jika kita menggunakan **TypeScript** dalam proyek **Metric Maintenance**, berikut adalah modifikasi dari kode sebelumnya dengan menambahkan dukungan TypeScript.

### 1. **Simpan Data Statis di Folder `data`**

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

### 2. **Membuat API Route dengan TypeScript**

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

### 3. **Mengakses Data Statis di Frontend dengan TypeScript**

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

### 4. **Penjelasan Kode Frontend dengan TypeScript**:

- **Conversation**: Tipe data yang mendefinisikan struktur percakapan, termasuk `user` dan `bot`.
- **useState**: Tipe data ditambahkan untuk memastikan `input` adalah string dan `messages` adalah array dari objek dengan properti opsional `user` dan `bot`.
- **handleSubmit**: Fungsi ini bertipe **FormEvent** yang memastikan tipe event form pada React.

Dengan pendekatan ini, aplikasi tetap menggunakan **TypeScript** sepenuhnya, yang memberikan keunggulan tipe statis dalam pengembangan dan pemeliharaan kode.
