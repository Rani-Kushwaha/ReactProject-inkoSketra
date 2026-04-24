import { testConnection } from "./services/firebase";

const runTest = async () => {
    const result = await testConnection();
    if (result.success) {
        console.log("🎉 Connection test passed!");
    } else {
        console.log("❌ Connection test failed:", result.error);
    }
};

runTest();