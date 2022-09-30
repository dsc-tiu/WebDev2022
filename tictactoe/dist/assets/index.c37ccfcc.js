import { R as t, r as u, a as b } from './vendor.eb030fe0.js';
const x = function () {
  const s = document.createElement('link').relList;
  if (s && s.supports && s.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver(e => {
    for (const a of e)
      if (a.type === 'childList')
        for (const l of a.addedNodes)
          l.tagName === 'LINK' && l.rel === 'modulepreload' && n(l);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(e) {
    const a = {};
    return (
      e.integrity && (a.integrity = e.integrity),
      e.referrerpolicy && (a.referrerPolicy = e.referrerpolicy),
      e.crossorigin === 'use-credentials'
        ? (a.credentials = 'include')
        : e.crossorigin === 'anonymous'
        ? (a.credentials = 'omit')
        : (a.credentials = 'same-origin'),
      a
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const a = o(e);
    fetch(e.href, a);
  }
};
x();
const h = ({ value: r, onClick: s, isWinningSquare: o }) =>
    t.createElement(
      'button',
      {
        type: 'button',
        onClick: s,
        className: `square ${o ? 'winning' : ''} ${
          r === 'X' ? 'text-green' : 'text-orange'
        }`,
        style: { fontWeight: o ? 'bold' : 'normal' },
      },
      r
    ),
  v = ({ board: r, handleSquareClick: s, winningSquares: o }) => {
    const n = e => {
      const a = o.includes(e);
      return t.createElement(h, {
        value: r[e],
        onClick: () => s(e),
        isWinningSquare: a,
      });
    };
    return t.createElement(
      'div',
      { className: 'board' },
      t.createElement('div', { className: 'board-row' }, n(0), n(1), n(2)),
      t.createElement('div', { className: 'board-row' }, n(3), n(4), n(5)),
      t.createElement('div', { className: 'board-row' }, n(6), n(7), n(8))
    );
  },
  w = ({ history: r, moveTo: s, currentMove: o }) =>
    t.createElement(
      'div',
      { className: 'history-wrapper' },
      t.createElement(
        'ul',
        { className: 'history' },
        r.map((n, e) =>
          t.createElement(
            'li',
            { key: e },
            t.createElement(
              'button',
              {
                className: `btn-move ${e === o ? 'active' : ''}`,
                type: 'button',
                onClick: () => {
                  s(e);
                },
              },
              e === 0 ? 'Go to game start' : `Go to move #${e}`
            )
          )
        )
      )
    ),
  S = ({ winner: r, current: s }) => {
    const o = s.board.every(n => n !== null);
    return t.createElement(
      'div',
      { className: 'status-message' },
      r &&
        t.createElement(
          t.Fragment,
          null,
          'Winner is',
          ' ',
          t.createElement(
            'span',
            { className: r === 'X' ? 'text-green' : 'text-orange' },
            r
          )
        ),
      !r &&
        !o &&
        t.createElement(
          t.Fragment,
          null,
          'Next player is',
          ' ',
          t.createElement(
            'span',
            { className: s.isXNext ? 'text-green' : 'text-orange' },
            s.isXNext ? 'X' : 'O',
            ' '
          )
        ),
      !r &&
        o &&
        t.createElement(
          t.Fragment,
          null,
          t.createElement('span', { className: 'text-green' }, 'X'),
          ' and',
          ' ',
          t.createElement('span', { className: 'text-orange' }, 'O'),
          ' tied'
        )
    );
  };
function X(r) {
  const s = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let o = 0; o < s.length; o++) {
    const [n, e, a] = s[o];
    if (r[n] && r[n] === r[e] && r[n] === r[a])
      return { winner: r[n], winningSquares: [n, e, a] };
  }
  return { winner: null, winningSquares: [] };
}
const d = [{ board: Array(9).fill(null), isXNext: !0 }],
  O = () => {
    const [r, s] = u.exports.useState(d),
      [o, n] = u.exports.useState(0),
      e = r[o],
      { winner: a, winningSquares: l } = X(e.board),
      f = i => {
        e.board[i] ||
          a ||
          (s(c => {
            const m = c[c.length - 1],
              N = m.board.map((p, y) =>
                y === i ? (m.isXNext ? 'X' : 'O') : p
              );
            return c.concat({ board: N, isXNext: !m.isXNext });
          }),
          n(c => c + 1));
      },
      E = i => {
        n(i);
      },
      g = () => {
        s(d), n(0);
      };
    return t.createElement(
      'div',
      { className: 'app' },
      t.createElement(
        'h1',
        null,
        t.createElement('span', { className: 'text-cyan' }, 'TIC'),
        ' ',
        t.createElement('span', { className: 'text-green' }, 'TAC'),
        ' ',
        t.createElement('span', { className: 'text-yellow' }, 'TOE')
      ),
      t.createElement(S, { winner: a, current: e }),
      t.createElement(v, {
        board: e.board,
        handleSquareClick: f,
        winningSquares: l,
      }),
      t.createElement(
        'button',
        {
          type: 'button',
          onClick: g,
          className: `btn-reset ${a ? 'active' : ''}`,
        },
        'Start new game'
      ),
      t.createElement(
        'h2',
        { style: { fontWeight: 'normal' } },
        'Current Game History'
      ),
      t.createElement(w, { history: r, moveTo: E, currentMove: o }),
      t.createElement('div', { className: 'bg-balls' })
    );
  };
b.render(t.createElement(O, null), document.getElementById('root'));
