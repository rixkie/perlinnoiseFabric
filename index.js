export default async function (req: Request): Promise<Response> {
  const html = `<!DOCTYPE html>
<html>
  <head>
    <title>Colorful Triangle Pattern</title>
    <!-- Load the Processing.js library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.6.0/processing.min.js"></script>
  </head>
  <body>
    <script type="application/processing">
      float s = 4;
      float t = 0;
      float w = 400;

      // Function to calculate the vertex positions
      float[] a(float x, float y) {
        float k = w * noise(t) - x;
        float e = w * noise(t, 9) - y;
        float d = -exp(-mag(k, e) / (40 + 145 * noise(x / 50, y / 50)));
        return new float[]{x + k * d, y + e * d};
      }

      void setup() {
        size(400, 400);
        noFill();
      }

      void draw() {
        background(248);

        for (float y = 0; y < w; y += s) {
          for (float x = 0; x < w; x += s) {
            // Set the stroke color based on sine functions
            stroke(
              128 + 128 * sin(x * 0.01 + t),
              128 + 128 * sin(y * 0.01 + t + 2),
              128 + 128 * sin((x + y) * 0.01 + t + 4)
            );

            float[] p1 = a(x, y);
            float[] p2 = a(x, y + s);
            float[] p3 = a(x + s, y);

            triangle(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
          }
        }

        t += 0.02;
      }
    </script>
    <canvas> </canvas>
  </body>
</html>
  `;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
