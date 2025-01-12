'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sidebar } from '@/components/ui/sidebar';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // メール送信のシミュレーション
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      
      // 5秒後にホームページにリダイレクト
      setTimeout(() => {
        router.push('/');
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">お問い合わせについて</h1>
          
          <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <p className="mb-2">
              お問い合わせの前に、
              <Link href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">
                よくある質問
              </Link>
              をご確認ください。
            </p>
            <p className="mb-2">
              緊急の回答は行っておりませんが、機能追加のご要望は
              <Link href="https://x.com/Watayoshi1984" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                X（@Watayoshi1984）
              </Link>
              のDMでも受け付けております。
            </p>
            <p>
              回答は <span className="font-semibold">mameo.purao2024@gmail.com</span> より送信いたします。
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center p-8 bg-green-100 dark:bg-green-900 rounded-lg">
              <h2 className="text-xl font-bold mb-4">お問い合わせを受け付けました</h2>
              <p className="mb-2">ご入力いただいたメールアドレスに確認メールをお送りしました。</p>
              <p>5秒後にホームページに移動します...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">
                  お名前 <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="example@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-2 font-medium">
                  お問い合わせ内容 <span className="text-red-500">*</span>
                </label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => setFormData({ ...formData, subject: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="お問い合わせ内容を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bug">バグ・エラーの報告</SelectItem>
                    <SelectItem value="feature">機能追加のご要望</SelectItem>
                    <SelectItem value="other">その他</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 font-medium">
                  メッセージ <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="お問い合わせ内容を詳しくご記入ください"
                  className="h-32"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? '送信中...' : '送信する'}
              </Button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

