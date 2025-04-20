// "use client";
import bcrypt from "bcrypt";

export default function Page() {
  const password = "123456";
  const saltRounds = 10; // 盐的迭代次数，数值越高越安全但耗时越长
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error("Failed to hash password:", err);
    } else {
      console.log("Hashed Password:", hash);
    }
  });

  return (
    <div>
      Test2 Page
      <button
      // onClick={async () => {
      //   // "use client";
      //   const password = "123456";
      //   const saltRounds = 10; // 盐的迭代次数，数值越高越安全但耗时越长
      //   try {
      //     const hashedPassword = await bcrypt.hash(password, saltRounds);
      //     console.log("Hashed Password:", hashedPassword);
      //     return hashedPassword;
      //   } catch (error) {
      //     console.error("Failed to hash password:", error);
      //     throw error;
      //   }
      // }}
      >
        111
      </button>
    </div>
  );
}
