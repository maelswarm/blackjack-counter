#include <stdio.h>
#include <math.h>

enum DEFS
{
    ACE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
    SIX = 6,
    SEVEN = 7,
    EIGHT = 8,
    NINE = 9,
    TEN = 10,
    JACK = 11,
    QUEEN = 12,
    KING = 13,
    DECK_COUNT = 8
};

int cards_count_length = 13;
static int cards_count[] = {
    [ACE] = 4 * DECK_COUNT,
    [TWO] = 4 * DECK_COUNT,
    [THREE] = 4 * DECK_COUNT,
    [FOUR] = 4 * DECK_COUNT,
    [FIVE] = 4 * DECK_COUNT,
    [SIX] = 4 * DECK_COUNT,
    [SEVEN] = 4 * DECK_COUNT,
    [EIGHT] = 4 * DECK_COUNT,
    [NINE] = 4 * DECK_COUNT,
    [TEN] = 4 * DECK_COUNT,
    [JACK] = 4 * DECK_COUNT,
    [QUEEN] = 4 * DECK_COUNT,
    [KING] = 4 * DECK_COUNT};

int TOTAL_CARDS = DECK_COUNT * 13 * 4;
int DRAWN_CARDS = 0;

int ftl(int i)
{
    long double i1 = log2l(i);
    if(i1 <= 0) {
        return 1;
    }
    while (i > 1)
    {
        i1 += log2l(i);
        --i;
        //printf("%d\n", i1);
    }
    return i1;
}

double calc_draw_chance(int idx)
{

    int N = TOTAL_CARDS - DRAWN_CARDS;
    int K = cards_count[idx];
    int n = 1;
    int k = 1;
printf("\tEnter a card: %i %i %i %i %f %f\n", N, K, n, k, (long double)(ftl(K) + ftl(N - K) + ftl(n) + ftl(N - n)), (long double)(ftl(N) + ftl(k) + ftl(K - k) + ftl(n - k) + ftl(N - K - n + k)));
    double p = pow(2, (long double)(ftl(K) + ftl(N - K) + ftl(n) + ftl(N - n)) - (long double)(ftl(N) + ftl(k) + ftl(K - k) + ftl(n - k) + ftl(N - K - n + k)));
    printf("\t%f\n", p);
    return p;
}

int main(void)
{
    int i1;

    while (1)
    {
        printf("\tEnter a card:\n");
        if (scanf("%i", &i1) != 1)
            break;

        --cards_count[i1];
        ++DRAWN_CARDS;
        for (int i = 0; i < cards_count_length; ++i)
        {
            double f1 = calc_draw_chance(i + 1);
            for (int z = 0; z<cards_count[i + 1]; ++z) {
                printf("|");
            }
            printf("\nChance of %i draw %f\n", i + 1, f1);
        }
    }

    return 0;
}