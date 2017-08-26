import config, {ASSETS, logConfig} from "../../server/config";

test("Test config file on not null", () => {
    expect(config).not.toBe(null);
});

test("Database is exist", () => {
    expect(config.database).not.toBe(null);
    expect(config.database.config).not.toBe(null);
    expect(config.database.development).not.toBe(null);
    expect(config.database.production).not.toBe(null);
});

test("Redis is exist", () => {
    expect(config.redis).not.toBe(null);
});

test("Hostname is exist", () => {
    expect(config.hostname).not.toBe(null);
});

test("ASSETS is exist", () => {
    expect(ASSETS).not.toBe(null);
});

test("logConfig is exist", () => {
    expect(logConfig).not.toBe(null);
});
