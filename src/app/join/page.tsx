import { Suspense } from "react";
import JoinForm from "./joinform";

export default function JoinPage() {
  return (
    <Suspense fallback={<div></div>}>
      <JoinForm />
    </Suspense>
  );
}
