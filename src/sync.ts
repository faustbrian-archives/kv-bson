// tslint:disable: no-unsafe-any
import { StoreSync as AbstractStore } from "@keeveestore/file";
import { deserialize, serialize } from "bson";
import { readFileSync, writeFileSync } from "fs-extra";

export class StoreSync<K, T> extends AbstractStore<K, T> {
	public static new<K, T>(uri: string): StoreSync<K, T> {
		return new StoreSync<K, T>(new Map<K, T>(), uri);
	}

	// @ts-ignore
	protected dump(rows: Record<K, T>): void {
		writeFileSync(this.uri, serialize(rows));
	}

	protected load(): void {
		for (const [key, value] of Object.entries(deserialize(readFileSync(this.uri)))) {
			// @ts-ignore
			this.put(key, value);
		}
	}
}
