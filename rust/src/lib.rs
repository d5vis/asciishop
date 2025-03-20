use wasm_bindgen::prelude::*;
use web_sys::ImageData;

#[wasm_bindgen]
pub fn image_to_ascii(
    image_data: ImageData,
    width: u32,
    brightness: f32,
    contrast: f32,
    invert_text: bool,
    character_set: String,
) -> String {
    let data = image_data.data();
    let factor = (259.0 * (contrast + 255.0)) / (255.0 * (259.0 - contrast));
    let mut ascii = String::with_capacity((data.len() / 4) + (data.len() / (4 * width as usize)));

    let ascii_characters = match character_set.as_str() {
        "block" => vec![' ', '░', '▒', '▓', '█'],
        "round" => vec![' ', '.', '●'],
        _ => vec![
            ' ', '.', '-', '\'', ':', '_', ',', '^', '=', ';', '>', '<', '+', '!', 'r', 'c', '*', '/',
            'z', '?', 's', 'L', 'T', 'v', ')', 'J', '7', '(', '|', 'F', 'i', '{', 'C', '}', 'f',
            'I', '3', '1', 't', 'l', 'u', '[', 'n', 'e', 'o', 'Z', '5', 'Y', 'x', 'j', 'y', 'a',
            ']', '2', 'E', 'S', 'w', 'q', 'k', 'P', '6', 'h', '9', 'd', '4', 'V', 'p', 'O', 'G',
            'b', 'U', 'A', 'K', 'X', 'H', 'm', '8', 'R', 'D', '#', '$', 'B', 'g', '0', 'M', 'N',
            'W', 'Q', '%', '&', '@'
        ],
    };

    let ascii_len = ascii_characters.len() as f32 - 1.0;

    for (i, chunk) in data.chunks(4).enumerate() {
        let mut r = chunk[0] as f32;
        let mut g = chunk[1] as f32;
        let mut b = chunk[2] as f32;

        r = factor * (r - 128.0) + 128.0 + brightness;
        g = factor * (g - 128.0) + 128.0 + brightness;
        b = factor * (b - 128.0) + 128.0 + brightness;

        if invert_text {
            r = 255.0 - r;
            g = 255.0 - g;
            b = 255.0 - b;
        }

        let brightness = (r + g + b) / 3.0;
        let index = ((brightness / 255.0) * ascii_len).clamp(0.0, ascii_len) as usize;
        ascii.push(ascii_characters[index]);

        if (i as u32 + 1) % width == 0 {
            ascii.push('\n');
        }
    }

    ascii
}