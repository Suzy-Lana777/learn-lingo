import { get, ref, remove, set } from "firebase/database";
import type { DataSnapshot, DatabaseReference } from "firebase/database";

import { db } from "./firebase";

const USERS_PATH = "users";

function favoritesRootRef(uid: string): DatabaseReference {
  return ref(db, `${USERS_PATH}/${uid}/favorites`);
}

function favoriteItemRef(uid: string, teacherId: string): DatabaseReference {
  return ref(db, `${USERS_PATH}/${uid}/favorites/${teacherId}`);
}

function mapSnapshotToIds(snapshot: DataSnapshot): string[] {
  if (!snapshot.exists()) return [];

  const data = snapshot.val() as Record<string, boolean>;

  return Object.entries(data)
    .filter(([, v]) => Boolean(v))
    .map(([id]) => id);
}

export async function addToFavorites(uid: string, teacherId: string) {
  await set(favoriteItemRef(uid, teacherId), true);
}

export async function removeFromFavorites(uid: string, teacherId: string) {
  await remove(favoriteItemRef(uid, teacherId));
}

export async function getFavorites(uid: string): Promise<string[]> {
  const snapshot = await get(favoritesRootRef(uid));
  return mapSnapshotToIds(snapshot);
}
