
import { useSpring as useReactSpring, animated as reactAnimated } from 'react-spring';
import * as THREE from 'three';

// Create a simplified version that works with ThreeJS elements
export const useSpring = useReactSpring;

// Create animated proxies for Three.js objects
export const animated = {
  ...reactAnimated,
  mesh: reactAnimated('mesh'),
  meshStandardMaterial: reactAnimated('meshStandardMaterial')
};
