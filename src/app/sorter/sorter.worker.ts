/// <reference lib="webworker" />
import bubbleSort from './sorter.helpers';

addEventListener('message', ({ data }) => {
  const response = bubbleSort(data);
  postMessage(response);
});
