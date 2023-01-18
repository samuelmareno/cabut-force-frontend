export default function ConvertToIDRFormat(amount: number): string {
    return new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR'})
        .format(amount);
}