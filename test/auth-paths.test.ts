import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import os from 'os';
import path from 'path';

describe('token cache path configuration', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  async function importHelpers() {
    const mod = await import('../src/auth.js');
    return {
      getTokenCachePath: mod.getTokenCachePath,
      getSelectedAccountPath: mod.getSelectedAccountPath,
    };
  }

  describe('getTokenCachePath', () => {
    it('should return default path under ~/.ms365-mcp when env var is not set', async () => {
      vi.stubEnv('MS365_MCP_TOKEN_CACHE_PATH', '');
      const { getTokenCachePath } = await importHelpers();
      const result = getTokenCachePath();
      expect(result).toBe(path.join(os.homedir(), '.ms365-mcp', 'token-cache.json'));
    });

    it('should return env var path when set', async () => {
      vi.stubEnv('MS365_MCP_TOKEN_CACHE_PATH', '/tmp/test-cache/token-cache.json');
      const { getTokenCachePath } = await importHelpers();
      const result = getTokenCachePath();
      expect(result).toBe('/tmp/test-cache/token-cache.json');
    });

    it('should trim whitespace from env var', async () => {
      vi.stubEnv('MS365_MCP_TOKEN_CACHE_PATH', '  /tmp/test-cache/token-cache.json  ');
      const { getTokenCachePath } = await importHelpers();
      const result = getTokenCachePath();
      expect(result).toBe('/tmp/test-cache/token-cache.json');
    });

    it('should return default path when env var is undefined', async () => {
      delete process.env.MS365_MCP_TOKEN_CACHE_PATH;
      const { getTokenCachePath } = await importHelpers();
      const result = getTokenCachePath();
      expect(result).toBe(path.join(os.homedir(), '.ms365-mcp', 'token-cache.json'));
    });

    it('should expand ~ in env var path', async () => {
      vi.stubEnv('MS365_MCP_TOKEN_CACHE_PATH', '~/custom/token-cache.json');
      const { getTokenCachePath } = await importHelpers();
      const result = getTokenCachePath();
      expect(result).toBe(path.join(os.homedir(), 'custom', 'token-cache.json'));
    });
  });

  describe('getSelectedAccountPath', () => {
    it('should return default path under ~/.ms365-mcp when env var is not set', async () => {
      vi.stubEnv('MS365_MCP_SELECTED_ACCOUNT_PATH', '');
      const { getSelectedAccountPath } = await importHelpers();
      const result = getSelectedAccountPath();
      expect(result).toBe(path.join(os.homedir(), '.ms365-mcp', 'selected-account.json'));
    });

    it('should return env var path when set', async () => {
      vi.stubEnv('MS365_MCP_SELECTED_ACCOUNT_PATH', '/tmp/test-cache/selected-account.json');
      const { getSelectedAccountPath } = await importHelpers();
      const result = getSelectedAccountPath();
      expect(result).toBe('/tmp/test-cache/selected-account.json');
    });

    it('should trim whitespace from env var', async () => {
      vi.stubEnv('MS365_MCP_SELECTED_ACCOUNT_PATH', '  /tmp/test-cache/selected-account.json  ');
      const { getSelectedAccountPath } = await importHelpers();
      const result = getSelectedAccountPath();
      expect(result).toBe('/tmp/test-cache/selected-account.json');
    });

    it('should return default path when env var is undefined', async () => {
      delete process.env.MS365_MCP_SELECTED_ACCOUNT_PATH;
      const { getSelectedAccountPath } = await importHelpers();
      const result = getSelectedAccountPath();
      expect(result).toBe(path.join(os.homedir(), '.ms365-mcp', 'selected-account.json'));
    });

    it('should expand ~ in env var path', async () => {
      vi.stubEnv('MS365_MCP_SELECTED_ACCOUNT_PATH', '~/custom/selected-account.json');
      const { getSelectedAccountPath } = await importHelpers();
      const result = getSelectedAccountPath();
      expect(result).toBe(path.join(os.homedir(), 'custom', 'selected-account.json'));
    });
  });
});
