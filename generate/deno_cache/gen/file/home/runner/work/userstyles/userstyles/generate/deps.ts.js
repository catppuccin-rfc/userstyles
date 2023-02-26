export { parse as parseYaml } from "https://deno.land/std@0.172.0/encoding/yaml.ts";
import Ajv from "npm:ajv@8.12.0";
import * as path from "https://deno.land/std@0.172.0/path/mod.ts";
import schema from "https://raw.githubusercontent.com/catppuccin/catppuccin/main/resources/ports.schema.json" assert {
    type: "json"
};
export { Ajv, path, schema };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvd29yay91c2Vyc3R5bGVzL3VzZXJzdHlsZXMvZ2VuZXJhdGUvZGVwcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBwYXJzZSBhcyBwYXJzZVlhbWwgfSBmcm9tIFwiaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTcyLjAvZW5jb2RpbmcveWFtbC50c1wiO1xuXG5pbXBvcnQgQWp2IGZyb20gXCJucG06YWp2QDguMTIuMFwiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwiaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQDAuMTcyLjAvcGF0aC9tb2QudHNcIjtcbmltcG9ydCBzY2hlbWEgZnJvbSBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9jYXRwcHVjY2luL2NhdHBwdWNjaW4vbWFpbi9yZXNvdXJjZXMvcG9ydHMuc2NoZW1hLmpzb25cIiBhc3NlcnQgeyB0eXBlOiBcImpzb25cIiB9O1xuXG5leHBvcnQgeyBBanYsIHBhdGgsIHNjaGVtYSB9O1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsU0FBUyxTQUFTLFFBQVEsaURBQWlEO0FBRXBGLE9BQU8sU0FBUyxpQkFBaUI7QUFDakMsWUFBWSxVQUFVLDRDQUE0QztBQUNsRSxPQUFPLFlBQVksa0dBQWtHO0lBQUUsTUFBTTtBQUFPLEVBQUU7QUFFdEksU0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sR0FBRyJ9