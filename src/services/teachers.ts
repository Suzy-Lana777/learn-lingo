/* ========================
   Imports
======================== */

import {
  ref,
  get,
  query,
  orderByKey,
  limitToFirst,
  startAfter,
} from "firebase/database";

import type { DatabaseReference, DataSnapshot } from "firebase/database";

import { db } from "./firebase";
import type { Teacher } from "../types/teacher";

/* ========================
   Types
======================== */

export type TeachersPage = {
  items: Teacher[];
  lastKey: string | null;
};

/* ========================
   Constants
======================== */

const TEACHERS_PATH = "teachers";

/* ========================
   Utils
======================== */

function createTeachersRef(): DatabaseReference {
  return ref(db, TEACHERS_PATH);
}

function mapSnapshotToTeachers(snapshot: DataSnapshot): TeachersPage {
  if (!snapshot.exists()) {
    console.warn("Firebase: /teachers is empty");
    return { items: [], lastKey: null };
  }

  const data = snapshot.val() as Record<string, Omit<Teacher, "id">>;

  const entries = Object.entries(data);

  const items: Teacher[] = entries.map(([key, value]) => ({
    id: key,
    ...value,
  }));

  const lastKey = entries.length ? entries[entries.length - 1][0] : null;

  return { items, lastKey };
}

/* ========================
   Public API
======================== */

export async function getFirstTeachers(limit = 4): Promise<TeachersPage> {
  const teachersRef = createTeachersRef();

  const teachersQuery = query(teachersRef, orderByKey(), limitToFirst(limit));

  const snapshot = await get(teachersQuery);

  return mapSnapshotToTeachers(snapshot);
}

export async function getNextTeachers(
  lastKey: string,
  limit = 4,
): Promise<TeachersPage> {
  const teachersRef = createTeachersRef();

  const teachersQuery = query(
    teachersRef,
    orderByKey(),
    startAfter(lastKey),
    limitToFirst(limit),
  );

  const snapshot = await get(teachersQuery);

  return mapSnapshotToTeachers(snapshot);
}
