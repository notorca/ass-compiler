import { expect } from 'chai';
import { parseDialogue } from '../../src/parser/dialogue.js';

describe('dialogue parser', () => {
  const format = ['Layer', 'Start', 'End', 'Style', 'Name', 'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text'];
  let text = '';

  it('should parse dialogue', () => {
    text = '0,0:00:00.00,0:00:05.00,Default,,0,0,0,,text';
    expect(parseDialogue(text, format)).to.deep.equal({
      Layer: 0,
      Start: 0,
      End: 5,
      Style: 'Default',
      Name: '',
      MarginL: 0,
      MarginR: 0,
      MarginV: 0,
      Effect: null,
      Text: {
        raw: 'text',
        combined: 'text',
        parsed: [{ tags: [], text: 'text', drawing: [] }],
      },
    });
    text = '0,0:00:00.00,0:00:05.00,Default,,0,0,0,,text,with,comma';
    expect(parseDialogue(text, format).Text).to.deep.equal({
      raw: 'text,with,comma',
      combined: 'text,with,comma',
      parsed: [{ tags: [], text: 'text,with,comma', drawing: [] }],
    });
  });
});
