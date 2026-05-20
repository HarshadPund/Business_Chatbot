import { app } from "./app.js";
import { assertDatabaseConnection } from "./config/database.js";
import { env } from "./config/env.js";
async function bootstrap() {
    await assertDatabaseConnection();
    app.listen(env.PORT, () => {
        console.log(`Codenixia API listening on port ${env.PORT}`);
    });
}
bootstrap().catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
});
