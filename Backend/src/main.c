#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "product.h"
#include "customer.h"
#include "admin.h"

int main(void) {
    printf("Content-Type: text/html\n\n");

    char *query = getenv("QUERY_STRING");

    if (query == NULL) {
        printf("<h1>Error: No query string received</h1>");
        return 1;
    }

    if (strstr(query, "action=add_product")) {
        add_products();
    } else if (strstr(query, "action=view_products")) {
        view_products();
    } else if (strstr(query, "action=add_customer")) {
        add_customer();
    } else if (strstr(query, "action=view_customers")) {
        view_customers();
    } else if (strstr(query, "action=admin_login")) {
        admin_login();
    } else {
        printf("<h1>Invalid action: %s</h1>", query);
    }

    return 0;
}