#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "customer.h"
#include "store.h"

void add_customer(void) {
    ensure_data_dir();
    FILE *f = fopen(CUSTOMERS_FILE, "a");
    if (!f) {
        printf("<p>Error: Could not open customers file.</p>");
        return;
    }
    fprintf(f, "Sample Customer\n");
    fclose(f);
    printf("<h2>Customer added successfully!</h2>");
}

void view_customers(void) {
    ensure_data_dir();
    FILE *f = fopen(CUSTOMERS_FILE, "r");
    if (!f) {
        printf("<p>No customers available.</p>");
        return;
    }
    printf("<h2>Customers List:</h2><ul>");
    char line[256];
    while (fgets(line, sizeof(line), f)) {
        line[strcspn(line, "\n")] = 0;
        printf("<li>%s</li>", line);
    }
    printf("</ul>");
    fclose(f);
}