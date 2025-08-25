<template>
  <router-link :to="`/orders/${order.id}`" class="block">
    <div
      class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div class="flex flex-col sm:flex-row">
        <!-- Order number and status -->
        <div
          class="bg-blue-600 text-white p-4 sm:p-6 flex-shrink-0 w-full sm:w-48 text-center"
        >
          <div class="text-sm opacity-90">Pre-Order</div>
          <div class="font-bold text-xl my-1">{{ order.header.number }}</div>
          <div class="text-xs opacity-90">#{{ order.header.serial }}</div>
        </div>

        <!-- Order details -->
        <div class="p-4 sm:p-6 flex-1">
          <div class="flex flex-col sm:flex-row justify-between">
            <div class="mb-4 sm:mb-0">
              <h3 class="font-bold text-lg text-gray-900">
                {{ order.header.buyer }}
              </h3>
              <div
                class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mt-2"
              >
                <span class="flex items-center">
                  <UserIcon class="w-4 h-4 mr-1.5 text-gray-400" />
                  {{ order.header.contact.name }}
                </span>
                <span class="flex items-center">
                  <EnvelopeIcon class="w-4 h-4 mr-1.5 text-gray-400" />
                  {{ order.header.contact.email }}
                </span>
                <span class="flex items-center">
                  <PhoneIcon class="w-4 h-4 mr-1.5 text-gray-400" />
                  {{ order.header.contact.phone }}
                </span>
              </div>
            </div>
            <div class="text-right">
              <div class="text-2xl font-bold text-gray-900">
                {{ order.header.currency }}
                {{ order.header.price.toLocaleString() }}
              </div>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-2"
                :class="statusClasses"
              >
                <component :is="statusIcon" class="w-3 h-3 mr-1" />
                {{ order.header.status }}
              </span>
              <div class="text-xs text-gray-500 mt-1">
                {{ formatDate(order.header.createdAt) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/vue/24/outline";

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
});

const statusIcon = computed(() => {
  const status = props.order.header.status?.toLowerCase();
  if (status === "confirmed") return CheckCircleIcon;
  if (status === "shipped") return TruckIcon;
  return ClockIcon;
});

const statusClasses = computed(() => {
  const status = props.order.header.status?.toLowerCase();
  if (status === "confirmed") return "bg-green-100 text-green-800";
  if (status === "shipped") return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
