import { format } from './utils';

describe('Utils', () => {
  describe('format', () => {
    it('should return empty string if no names defined', () => {
      expect(format(undefined, undefined, undefined)).toEqual('');
    });

    it('should format only first name', () => {
      expect(format('Joseph', undefined, undefined)).toEqual('Joseph');
    });

    it('should format first and last name', () => {
      expect(format('Joseph', undefined, 'Publique')).toEqual('Joseph Publique');
    });

    it('should format first, middle, and last name', () => {
      expect(format('Joseph', 'Quincy', 'Publique')).toEqual('Joseph Quincy Publique');
    });
  });
});
