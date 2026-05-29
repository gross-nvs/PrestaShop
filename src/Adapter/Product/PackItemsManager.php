<?php
/**
 * For the full copyright and license information, please view the
 * docs/licenses/LICENSE.txt file that was distributed with this source code.
 */

declare(strict_types=1);

namespace PrestaShop\PrestaShop\Adapter\Product;

use Pack;
use Product;

/**
 * Class responsible for getting information about Pack Items.
 */
class PackItemsManager implements PackItemsManagerInterface
{
    public function __construct(
        private readonly int $defaultLanguageId,
    ) {
    }

    /**
     * {@inheritDoc}
     */
    public function getPackItems(Product|Pack $pack, bool|int $id_lang = false): array
    {
        return Pack::getItems($pack->id, $id_lang ?: $this->defaultLanguageId);
    }

    /**
     * {@inheritDoc}
     */
    public function getPacksContainingItem(Product $item, int $item_attribute_id, bool|int $id_lang = false): array
    {
        return Pack::getPacksContainingItem($item->id, $item_attribute_id, $id_lang ?: $this->defaultLanguageId);
    }

    /**
     * {@inheritDoc}
     */
    public function isPack(Product $product): bool
    {
        return Pack::isPack($product->id);
    }

    /**
     * {@inheritDoc}
     */
    public function isPacked(Product $product, int|bool $id_product_attribute = false): bool
    {
        return Pack::isPacked($product->id, $id_product_attribute);
    }
}
