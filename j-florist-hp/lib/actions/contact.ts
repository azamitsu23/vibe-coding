"use server";

import { z } from "zod";
import { FormResponse } from "@/types";

const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  phone: z.string().min(10, "正しい電話番号を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  subject: z.string().min(1, "お問い合わせ内容を選択してください"),
  message: z.string().min(10, "お問い合わせ内容は10文字以上入力してください"),
});

export async function submitContactForm(
  formData: FormData
): Promise<FormResponse> {
  try {
    // バリデーション
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const validation = contactSchema.safeParse(data);

    if (!validation.success) {
      const errors: Record<string, string[]> = {};
      validation.error.errors.forEach((error) => {
        const path = error.path[0] as string;
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(error.message);
      });

      return {
        success: false,
        message: "入力内容に誤りがあります",
        errors,
      };
    }

    // メール送信処理
    // Option 1: SMTP を使用する場合
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      await sendEmailViaSMTP(validation.data);
    }
    // Option 2: FormSubmit などの外部サービスを使用する場合
    else if (process.env.FORMSUBMIT_URL) {
      await sendEmailViaFormSubmit(validation.data);
    }
    // デバッグ用：環境変数が設定されていない場合はコンソールに出力
    else {
      console.log("Contact form submission:", validation.data);
    }

    return {
      success: true,
      message: "お問い合わせを受け付けました。担当者より折り返しご連絡いたします。",
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      message: "送信中にエラーが発生しました。お手数ですが、お電話にてお問い合わせください。",
    };
  }
}

async function sendEmailViaSMTP(data: z.infer<typeof contactSchema>) {
  // SMTP経由でメール送信
  // 実装例：nodemailer などのライブラリを使用
  // この部分は実際の環境に応じて実装してください
  console.log("Sending email via SMTP:", data);

  // Example implementation with nodemailer:
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASSWORD,
  //   },
  // });
  // await transporter.sendMail({
  //   from: process.env.SMTP_FROM,
  //   to: process.env.SMTP_TO,
  //   subject: `【お問い合わせ】${data.subject}`,
  //   text: `お名前: ${data.name}\n電話番号: ${data.phone}\nメール: ${data.email}\n\n${data.message}`,
  // });
}

async function sendEmailViaFormSubmit(data: z.infer<typeof contactSchema>) {
  // FormSubmit などの外部サービス経由でメール送信
  const response = await fetch(process.env.FORMSUBMIT_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to send email via FormSubmit");
  }
}
