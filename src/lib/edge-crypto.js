// Edge runtime compatible crypto implementation
export function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function randomBytes(size) {
  const bytes = new Uint8Array(size);
  for (let i = 0; i < size; i++) {
    bytes[i] = Math.floor(Math.random() * 256);
  }
  return bytes;
}

export function createHash(algorithm) {
  // Simple hash implementation for edge runtime
  return {
    update(data) {
      this.data = data;
      return this;
    },
    digest(encoding) {
      // This is a very simplified hash function, not secure for production
      let hash = 0;
      for (let i = 0; i < this.data.length; i++) {
        const char = this.data.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
      }
      
      if (encoding === 'hex') {
        return Math.abs(hash).toString(16).padStart(8, '0');
      }
      
      return String(hash);
    }
  };
}
