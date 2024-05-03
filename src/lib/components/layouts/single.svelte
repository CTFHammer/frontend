<div
	class="dark:border-dark-yellow-400 m-5 flex flex-col rounded-md border shadow dark:bg-dark-yellow-500"
>
	{#if $$slots.title}
		<div class="p-3 text-lg font-bold">
			<slot name="title" />
		</div>
		<hr class=" dark:bg-dark-yellow-400 h-px border-0 bg-gray-200" />
	{/if}
	<div class="p-3">
		<slot>
			<span>Not provided yet</span>
		</slot>
	</div>
</div>
