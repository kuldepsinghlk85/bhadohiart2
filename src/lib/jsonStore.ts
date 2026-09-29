import fs from 'fs';
import path from 'path';

// Define the absolute path for data storage
const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.error('Failed to create data directory', e);
  }
}

// Generic function to read data from a JSON file
export function readJsonStore<T>(filename: string): T[] {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as T[];
  } catch (error) {
    console.error(`Error reading from ${filename}:`, error);
    return [];
  }
}

// Generic function to write data to a JSON file
export function writeJsonStore<T>(filename: string, data: T[]): boolean {
  try {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error);
    return false;
  }
}

// Helper to upsert (update or insert) an item by ID
export function upsertJsonItem<T extends { id: string }>(filename: string, item: T): T {
  const currentData = readJsonStore<T>(filename);
  const existingIndex = currentData.findIndex(d => d.id === item.id);
  
  if (existingIndex >= 0) {
    currentData[existingIndex] = { ...currentData[existingIndex], ...item };
  } else {
    currentData.push(item);
  }
  
  writeJsonStore(filename, currentData);
  return item;
}

// Helper to delete an item by ID
export function deleteJsonItem<T extends { id: string }>(filename: string, id: string): boolean {
  const currentData = readJsonStore<T>(filename);
  const newData = currentData.filter(d => d.id !== id);
  if (currentData.length !== newData.length) {
    return writeJsonStore(filename, newData);
  }
  return false;
}
