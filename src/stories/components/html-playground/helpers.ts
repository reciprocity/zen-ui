type TextRange = { start: number; end: number };
type TextOrInput = HTMLTextAreaElement | HTMLInputElement;

export function insertAtCursor(input: TextOrInput, value: string): void {
  insertText(input, value, getCursorPos(input));
}

export function insertText(input: TextOrInput, value: string, position: TextRange): void {
  input.value =
    input.value.substring(0, position.start) +
    value +
    input.value.substring(position.end || position.start, input.value.length);
}

export function getCursorPos(input: TextOrInput): TextRange {
  if (document['selection']) {
    console.error('IE not supported');
    return { start: 0, end: 0 };
  }

  if (input.selectionStart || input.selectionStart === 0) {
    return {
      start: input.selectionStart,
      end: input.selectionEnd,
    };
  } else {
    return { start: 0, end: 0 };
  }
}

export function setCursorPos(input: TextOrInput, pos: TextRange): void {
  input.focus();
  input.setSelectionRange(pos.start, pos.end || pos.start);
}

export function getBeginningOfLine(text: string, position: number): number {
  let n = position - 1;
  while (text[n] && ![10, 13].includes(text.charCodeAt(n))) n--;
  return n + 1;
}

export function indent(input: TextOrInput, indentLength = 2): void {
  // insert spaces at the beginning of row with cursor:
  const pos = getCursorPos(input);
  const start = getBeginningOfLine(input.value, pos.start);
  insertText(input, ' '.repeat(indentLength), { start, end: 0 });
  setCursorPos(input, { start: pos.start + indentLength, end: 0 });
}

export function unindent(input: TextOrInput, indentLength = 2): void {
  // remove spaces at the beginning of row with cursor:
  const pos = getCursorPos(input);
  const start = getBeginningOfLine(input.value, pos.start);
  const startChars = input.value.substring(start, start + indentLength);
  if (startChars !== ' '.repeat(indentLength)) return;
  input.value = input.value.substring(0, start) + input.value.substring(start + indentLength, input.value.length);
  setCursorPos(input, { start: pos.start - indentLength, end: 0 });
}
