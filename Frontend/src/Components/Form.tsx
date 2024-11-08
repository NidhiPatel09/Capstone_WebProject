"use client";
import React, { ReactNode, useRef, FormEvent, useState } from "react";

type FormProps = {
  children: ReactNode;
  action: (formData: FormData) => Promise<object>;
  successMsg: String
};

export default function Form({ children, action, successMsg }: FormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState('');
  
  return (
    <form ref={ref} action={
      async(e) => { const result = await action(e); } }>
      {children}
    </form>
  );
}