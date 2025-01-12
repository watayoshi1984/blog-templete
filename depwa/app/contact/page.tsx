'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/ui/sidebar';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // フォーム送信処理を実装
    console.log('Form submitted:', formData);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">お問い合わせ</h1>
            <p className="text-gray-600 mb-8">
              ご質問、ご要望、不具合の報告など、お気軽にお問い合わせください。
              <br />
              通常2営業日以内にご返信いたします。
            </p>
          </div>

          {/* お問い合わせ方法の案内 */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Mail className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-lg font-semibold mb-2">メールでのお問い合わせ</h3>
              <p className="text-gray-600">
                フォームからお送りいただくと、
                <br />
                確実に対応いたします
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <h3 className="text-lg font-semibold mb-2">よくある質問</h3>
              <p className="text-gray-600">
                お問い合わせの前に
                <br />
                FAQをご確認ください
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Phone className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-lg font-semibold mb-2">緊急のご連絡</h3>
              <p className="text-gray-600">
                重大な不具合のご報告は
                <br />
                優先対応いたします
              </p>
            </div>
          </div>

          {/* お問い合わせフォーム */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">お問い合わせフォーム</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="山田 太郎"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-medium">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="example@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="block font-medium">
                  件名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="お問い合わせの件名をご記入ください"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block font-medium">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="具体的な内容をご記入ください"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">お問い合わせの前に</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>必須項目（<span className="text-red-500">*</span>）は全てご記入ください</li>
                  <li>ご返信は2営業日以内を目安にさせていただきます</li>
                  <li>緊急の場合は、その旨を件名にご記載ください</li>
                </ul>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                送信する
              </button>
            </form>
          </div>

          {/* プライバシーポリシー */}
          <div className="text-center text-gray-600 text-sm">
            <p>
              ご入力いただいた個人情報は、お問い合わせへの対応のみに使用し、
              <br />
              その他の目的では使用いたしません。
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

