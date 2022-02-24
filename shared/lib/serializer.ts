import { formatISO, parseISO } from "date-fns";

export function serialize<T>(data: any): T {
  return Object.keys(data).reduce((obj, key) => {
    const value = data[key];

    if (typeof value === "function") {
      return obj;
    }

    if (value instanceof Date) {
      obj[key] = serializeDate(value);
    } else {
      obj[key] = value;
    }

    return obj;
  }, {} as T);
}

export function deserialize<T>(data: any): T {
  return Object.keys(data).reduce((obj, key) => {
    const value = data[key];

    if (typeof value === "string" && isISODateString(value)) {
      obj[key] = deserializeDate(value);
    } else {
      obj[key] = value;
    }

    return obj;
  }, {} as T);
}

function serializeDate(date: Date) {
  return formatISO(date);
}

// NOTE: find faster solution
function isISODateString(text: string) {
  try {
    return text === serializeDate(deserializeDate(text));
  } catch (error) {
    return false;
  }
}

function deserializeDate(text: string) {
  return parseISO(text);
}
