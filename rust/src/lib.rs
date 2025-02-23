use wasm_bindgen::prelude::*;
use web_sys::ImageData;

#[wasm_bindgen]
pub fn image_to_ascii(
    image_data: ImageData,
    width: u32,
    brightness: f32,
    contrast: f32,
    invert_text: bool,
) -> String {
    let data = image_data.data();
    let factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));
    let mut ascii = String::new();
    let ascii_characters = [
        " ", // 0 (black)
        ".", // 1
        "'", // 2
        ":", // 3
        "^", // 4
        "-", // 5
        "~", // 6
        "*", // 7 (dark gray)
        "#", // 8
        "@", // 9
        "$", // 10
        "%", // 11
        "&", // 12
        "=", // 13
        "+", // 14
        "x", // 15 (medium gray)
        "X", // 16
        "o", // 17
        "O", // 18
        "0", // 19
        "Q", // 20
        "E", // 21
        "C", // 22
        "H", // 23
        "G", // 24
        "T", // 25 (lighter gray)
        "B", // 26
        "L", // 27
        "F", // 28
        "I", // 29
        "J", // 30
        "1", // 31
        "#", // 32 (mid-gray, repeat for smoother transition)
        "&", // 33 (repeat for smoother transition)
        "%", // 34
        "$", // 35
        "@", // 36
        "*", // 37
        "=", // 38
        "+", // 39
        "x", // 40 (lighter gray)
        "X", // 41
        "o", // 42
        "O", // 43
        "0", // 44
        "Q", // 45
        "E", // 46
        "C", // 47
        "H", // 48
        "G", // 49
        "T", // 50 (white)
        "7", // 51 (repeat for smoother transition)
        "9", // 52 (repeat for smoother transition)
        "B", // 53
        "L", // 54
        "F", // 55
        "I", // 56
        "J", // 57
        "1", // 58
        " ", // 59 (white, repeat for smoother transition)
        " ", // 60
        " ", // 61
        " ", // 62
        " ", // 63
        " ", // 64
        " ", // 65
        " ", // 66
        " ", // 67
        " ", // 68
        " ", // 69
    ];

    for i in (0..data.len()).step_by(4) {
        let mut r = data[i] as f32;
        let mut g = data[i + 1] as f32;
        let mut b = data[i + 2] as f32;

        r = factor * (r - 128.0) + 128.0 + brightness;
        g = factor * (g - 128.0) + 128.0 + brightness;
        b = factor * (b - 128.0) + 128.0 + brightness;

        if invert_text {
            r = 255.0 - r;
            g = 255.0 - g;
            b = 255.0 - b;
        }

        let brightness = (r + g + b) / 3.0;
        let index = ((brightness / 255.0) * (ascii_characters.len() - 1) as f32)
            .clamp(0.0, (ascii_characters.len() - 1) as f32) as usize;
        ascii.push_str(ascii_characters[index]);

        if (i / 4) as u32 % width == 0 {
            ascii.push('\n');
        }
    }

    ascii
}
