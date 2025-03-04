(window["webpackJsonpprotobuf-decoder"] =
  window["webpackJsonpprotobuf-decoder"] || []).push([
  [0],
  {
    11: function(e, t, r) {
      "use strict";
      (function(e) {
        function n(t) {
          var r = t.replace(/\s/g, ""),
            n = r.replace(/0x/g, "").toLowerCase();
          return (function(e) {
            var t = !0,
              r = !0,
              n = !1,
              a = void 0;
            try {
              for (
                var f, u = e[Symbol.iterator]();
                !(r = (f = u.next()).done);
                r = !0
              ) {
                var i = f.value;
                (i >= "a" && i <= "f") || (i >= "0" && i <= "9") || (t = !1);
              }
            } catch (o) {
              (n = !0), (a = o);
            } finally {
              try {
                r || null == u.return || u.return();
              } finally {
                if (n) throw a;
              }
            }
            return t;
          })(n)
            ? e.from(n, "hex")
            : e.from(r, "base64");
        }
        function a(e) {
          var t = "",
            r = !0,
            n = !1,
            a = void 0;
          try {
            for (
              var f, u = e[Symbol.iterator]();
              !(r = (f = u.next()).done);
              r = !0
            ) {
              var i = f.value;
              "" !== t && (t += " ");
              var o = i.toString(16);
              1 === o.length ? (t += "0" + o) : (t += o);
            }
          } catch (l) {
            (n = !0), (a = l);
          } finally {
            try {
              r || null == u.return || u.return();
            } finally {
              if (n) throw a;
            }
          }
          return t;
        }
        function f(e) {
          var t = "",
            r = !0,
            n = !1,
            a = void 0;
          try {
            for (
              var f, u = e[Symbol.iterator]();
              !(r = (f = u.next()).done);
              r = !0
            ) {
              var i = f.value.toString(16);
              t = 1 === i.length ? "0" + i + t : i + t;
            }
          } catch (o) {
            (n = !0), (a = o);
          } finally {
            try {
              r || null == u.return || u.return();
            } finally {
              if (n) throw a;
            }
          }
          return t;
        }
        r.d(t, "c", function() {
          return n;
        }),
          r.d(t, "b", function() {
            return a;
          }),
          r.d(t, "a", function() {
            return f;
          });
      }.call(this, r(25).Buffer));
    },
    20: function(e, t, r) {
      e.exports = r(33);
    },
    30: function(e, t, r) {},
    33: function(e, t, r) {
      "use strict";
      r.r(t);
      var n = r(0),
        a = r.n(n),
        f = r(19),
        u = r.n(f),
        i = r(17),
        o = r(4),
        l = r(2),
        c = r(11),
        s = (r(30), r(7)),
        v = r(8),
        h = r(5),
        d = r.n(h),
        y = (d.a.BigInt(1), d.a.BigInt(2));
      var p = (function() {
          function e(t) {
            Object(s.a)(this, e), (this.buffer = t), (this.offset = 0);
          }
          return (
            Object(v.a)(e, [
              {
                key: "readVarInt",
                value: function() {
                  var e = (function(e, t) {
                    var r = d.a.BigInt(0),
                      n = 0,
                      a = 0;
                    do {
                      if (t >= e.length)
                        throw new RangeError(
                          "Index out of bound decoding varint"
                        );
                      a = e[t++];
                      var f = d.a.exponentiate(y, d.a.BigInt(n)),
                        u = d.a.multiply(d.a.BigInt(127 & a), f);
                      (n += 7), (r = d.a.add(r, u));
                    } while (a >= 128);
                    return { value: r, length: n / 7 };
                  })(this.buffer, this.offset);
                  return (this.offset += e.length), e.value;
                }
              },
              {
                key: "readBuffer",
                value: function(e) {
                  this.checkByte(e);
                  var t = this.buffer.slice(this.offset, this.offset + e);
                  return (this.offset += e), t;
                }
              },
              {
                key: "trySkipGrpcHeader",
                value: function() {
                  var e = this.offset;
                  if (0 === this.buffer[this.offset] && this.leftBytes() >= 5) {
                    this.offset++;
                    var t = this.buffer.readInt32BE(this.offset);
                    (this.offset += 4),
                      t > this.leftBytes() && (this.offset = e);
                  }
                }
              },
              {
                key: "leftBytes",
                value: function() {
                  return this.buffer.length - this.offset;
                }
              },
              {
                key: "checkByte",
                value: function(e) {
                  var t = this.leftBytes();
                  if (e > t)
                    throw new Error(
                      "Not enough bytes left. Requested: " + e + " left: " + t
                    );
                }
              },
              {
                key: "checkpoint",
                value: function() {
                  this.savedOffset = this.offset;
                }
              },
              {
                key: "resetToCheckpoint",
                value: function() {
                  this.offset = this.savedOffset;
                }
              }
            ]),
            e
          );
        })(),
        g = 0,
        b = 1,
        B = 2,
        m = 5;
      function w(e) {
        var t = new p(e),
          r = [];
        t.trySkipGrpcHeader();
        try {
          for (; t.leftBytes() > 0; ) {
            t.checkpoint();
            var n = [t.offset],
              a = parseInt(t.readVarInt().toString()),
              f = 7 & a,
              u = a >> 3,
              i = void 0;
            if (f === g) i = t.readVarInt().toString();
            else if (f === B) {
              var o = parseInt(t.readVarInt().toString());
              i = t.readBuffer(o);
            } else if (f === m) i = t.readBuffer(4);
            else {
              if (f !== b) throw new Error("Unknown type: " + f);
              i = t.readBuffer(8);
            }
            n.push(t.offset),
              r.push({ byteRange: n, index: u, type: f, value: i });
          }
        } catch (l) {
          t.resetToCheckpoint();
        }
        return { parts: r, leftOver: t.readBuffer(t.leftBytes()) };
      }
      d.a.BigInt("0x7fffffffffffffff"), d.a.BigInt("0x10000000000000000");
      function k(e) {
        return (function(e) {
          var t = [],
            r = d.a.BigInt(e);
          return t.push({ value: r.toString() }), t;
        })(e.value)
          .map(function(e, t) {
            return 0 === t ? e.value : null;
          })
          .filter(function(e) {
            return e;
          });
      }
      function I(e) {
        switch (e.type) {
          case g:
            return [a.a.createElement(k, { value: e.value })];
          case B:
            var t = w(e.value);
            return e.value.length > 0 && 0 === t.leftOver.length
              ? [a.a.createElement(O, { value: t })]
              : ((t = (function(e) {
                  if (!e.length) return { type: "string|bytes", value: "" };
                  var t = new TextDecoder("utf-8", { fatal: !0 });
                  try {
                    return { type: "string", value: t.decode(e) };
                  } catch (r) {
                    return { type: "bytes", value: Object(c.b)(e) };
                  }
                })(e.value)),
                "");
        }
      }
      var E = function(e) {
        var t = I(e.part);
        return Object(o.a)(t, 1)[0];
      };
      var O = function(e) {
        var t = e.value.parts
          .map(function(e, t) {
            return 0 === t ? a.a.createElement(E, { key: t, part: e }) : null;
          })
          .filter(function(e) {
            return e;
          });
        return a.a.createElement(n.Fragment, null, t);
      };
      var x = function() {
        var e = Object(n.useState)(""),
          t = Object(o.a)(e, 2),
          r = t[0],
          f = t[1],
          u = Object(l.j)();
        Object(n.useEffect)(
          function() {
            if ("/" !== u.pathname) {
              var e = decodeURI(u.pathname.substr(1)),
                t = Object(c.c)(e);
              f(t);
            }
          },
          [u.pathname]
        );
        var i = r ? a.a.createElement(O, { value: w(r) }) : null;
        return a.a.createElement(n.Fragment, null, i);
      };
      r(32);
      u.a.render(
        a.a.createElement(i.a, null, a.a.createElement(x, null)),
        document.getElementById("root")
      );
    }
  },
  [[20, 1, 2]]
]);
//# sourceMappingURL=main.ca8628fb.chunk.js.map
