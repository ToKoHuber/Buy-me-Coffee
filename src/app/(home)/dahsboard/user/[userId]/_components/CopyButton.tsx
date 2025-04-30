"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CopyButton({ value }: { value: number | undefined }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!value) return;

    navigator.clipboard
      .writeText("localhost:3000/user/" + JSON.stringify(value))
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <Button size="sm" onClick={copyToClipboard} type="button">
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-2" /> Copied page link
        </>
      ) : (
        <>
          <Copy className="h-4 w-4 mr-2" /> Share page link
        </>
      )}
    </Button>
  );
}
