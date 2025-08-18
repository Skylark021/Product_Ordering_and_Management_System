#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "product.h"
#include "store.h"

void add_products(void) {
    ensure_data_dir();
    FILE *f = fopen(PRODUCTS_FILE, "a");
    if (!f) {
        printf("<p>Error: Could not open products file.</p>");
        return;
    }
    fprintf(f, "Sample Product\n");
    fclose(f);
    printf("<h2>Product added successfully!</h2>");
}

void view_products(void) {
    ensure_data_dir();
    FILE *f = fopen(PRODUCTS_FILE, "r");
    if (!f) {
        printf("<p>No products available.</p>");
        return;
    }
    printf("<h2>Products List:</h2><ul>");
    char line[256];
    while (fgets(line, sizeof(line), f)) {
        line[strcspn(line, "\n")] = 0;
        printf("<li>%s</li>", line);
    }
    printf("</ul>");
    fclose(f);
}