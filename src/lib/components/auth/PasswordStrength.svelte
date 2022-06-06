<script lang="ts">
	type VerficationFunctions = (string: string) => boolean;

	export let password: string = 'ADAam';
	type StrengthColor = 'weak' | 'medium' | 'strong';

	const hasUppercase = (string: string) => {
		return string.toLowerCase() !== string;
	};

	const hasLowercase = (string: string) => {
		return string.toUpperCase() !== string;
	};

	const hasNumber = (string: string) => {
		return /\d/.test(string);
	};

	const hasSpecialChar = (string: string) => {
		const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
		return regex.test(string);
	};

	const isMediumLength = (string: string) => {
		return string.length >= 6;
	};

	const isLargeLength = (string: string) => {
		return string.length >= 8;
	};

	const verfications: VerficationFunctions[] = [
		hasUppercase,
		hasNumber,
		hasLowercase,
		hasSpecialChar,
		isMediumLength,
		isLargeLength
	];

	const getPasswordStrength = (string: string) => {
		return verfications.reduce((acc, curr) => {
			if (curr(string)) acc++;
			return acc;
		}, 0);
	};

	const getStrengthColor = (strength: number): StrengthColor => {
		if (strength <= 2) return 'weak';
		if (strength <= 4) return 'medium';
		if (strength <= 6) return 'strong';

		return 'weak';
	};

	$: passwordStrength = getPasswordStrength(password);
	$: strengthColor = getStrengthColor(passwordStrength);
</script>

<div class="strength-wrap">
	<h5>Password Strength</h5>
	<div class="strength">
		{#each verfications as _, i}
			<div class:filled={passwordStrength > i} class="strength__bar {strengthColor}" />
		{/each}
	</div>
</div>

<style lang="scss">
	.strength-wrap {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		width: 100%;
	}
	h5 {
		color: var(--color-text-body);
	}
	.strength {
		display: flex;
		width: 100%;
		gap: var(--space-xs);

		&__bar {
			border-radius: 100px;
			width: 100%;
			height: 10px;
			background-color: var(--color-trans);
		}
	}

	.filled {
		background-color: var(--color-primary);

		&.weak {
			background-color: var(--color-red);
		}

		&.medium {
			background-color: orange;
		}

		&.strong {
			background-color: var(--color-green);
		}
	}

	@media screen and (max-width: 425px) {
		.strength {
			gap: var(--space-2xs);
		}
	}
</style>
