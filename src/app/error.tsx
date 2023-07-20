"use client";

import { Button } from "@/components/ui/button";
import React from "react";

export default function Error({ error, reset }: any) {
  React.useEffect(() => {
    console.log("logging error:", error);
  }, [error]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Error</h2>
      <p className="text-sm">{error?.message}</p>
      <div>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
