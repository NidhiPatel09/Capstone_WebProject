"use client";
import React, { ReactNode, useRef, FormEvent, useState } from "react";

type FormProps = {
  children: ReactNode;
  action: (formData: FormData) => Promise<String>;
  successMsg: String
};

export default function Form({ children, action, successMsg }: FormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<String>('');

  return (
    <form ref={ref} action={
      async(e) => { const result = await action(e); setMessage(result); if(result === successMsg) { ref.current?.reset(); } } }>
      <h4 className={message === successMsg ? "text-green-600 text-center mb-3" : "text-red-600 text-center mb-3"}>{message}</h4>
      {children}
    </form>
  );
}