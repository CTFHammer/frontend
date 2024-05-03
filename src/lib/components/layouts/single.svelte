<div
	class="m-5 flex flex-col rounded-md border shadow dark:border-dark-yellow-400 dark:bg-dark-yellow-500"
>
	{#if $$slots.title}
		<div class="flex items-center p-3">
			<div class="text-lg font-bold">
				<slot name="title" />
			</div>
			{#if $$slots.action}
				<slot name="action" />

				<hr class="h-px border-0 bg-gray-200 dark:bg-dark-yellow-400" />
			{/if}
		</div>
		<hr class="h-px border-0 bg-gray-200 dark:bg-dark-yellow-400" />
	{/if}
	<div class="p-3">
		<slot>
			<span>Not provided yet</span>
		</slot>
	</div>
</div>
