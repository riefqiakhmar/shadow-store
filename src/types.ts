/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ProductCategory = 'GPU' | 'CPU' | 'RAM' | 'STORAGE' | 'COOLER' | 'MOTHERBOARD' | 'PREBUILD';

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  specs: Record<string, string>;
  isPopular?: boolean;
  benchmarkScore?: {
    label: string;
    value: number; // e.g. 140 for 140 FPS
    unit: string;  // e.g. "FPS"
  };
  features: string[];
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customSelections?: {
    cpu?: Product;
    gpu?: Product;
    ram?: Product;
    storage?: Product;
    cooler?: Product;
    motherboard?: Product;
  };
}

export interface GameSupport {
  id: string;
  title: string;
  image: string;
  hasRayTracing: boolean;
  hasDLSS: boolean;
  hasReflex: boolean;
  fpsMultiplier: string; // e.g. "3.2x"
  description: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}
