// "use client";

// import { useState } from "react";
// import { FindUserName } from "./_components/FindUserName";
// import { Signup } from "./_components/Singup";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function SignUp() {
//   const router = useRouter();
//   const [currentStep, setCurrentStep] = useState(0);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [userName, setUserName] = useState("");
//   const FormSteps = [FindUserName, Signup][currentStep];

//   return (
//     <div className="w-[50%] v-[100vh] flex justify-center items-center relative">
//       <Button
//         className="absolute top-[32px] right-[108px]"
//         onClick={() => router.push("/login")}
//       >
//         Log in
//       </Button>
//       <FormSteps
//         setEmail={setEmail}
//         setPassword={setPassword}
//         email={email}
//         onClick={() => {
//           setCurrentStep(currentStep + 1);
//         }}
//         goBack={() => {
//           setCurrentStep(currentStep - 1);
//         }}
//       />
//     </div>
//   );
// }

"use client";

import { useState } from "react";

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkUsernameAvailability = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/check-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (data.available) {
        setStep(2);
      } else {
        setError("Username already taken");
      }
    } catch (err) {
      setError("Error checking username.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        throw new Error("Signup failed.");
      }

      alert("Signup successful!");
      setStep(3); // Move to success screen
    } catch (err) {
      setError("Error signing up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Choose a Username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter username"
          />
          <button
            onClick={checkUsernameAvailability}
            disabled={loading}
            className="w-full mt-3 p-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Checking..." : "Next"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSignup}>
          <h2 className="text-xl font-bold mb-4">Create Your Account</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Enter password"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 p-2 bg-green-500 text-white rounded"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      )}

      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold text-green-500">
            🎉 Signup Successful!
          </h2>
          <p>You can now log in to your account.</p>
        </div>
      )}
    </div>
  );
}
