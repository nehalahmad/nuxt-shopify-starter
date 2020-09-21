import Vue from "vue";
import { currency } from "~/utils/currency";

/**
 * Register Vue Filters
 */

Vue.filter("currency", currency);
